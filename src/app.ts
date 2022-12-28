import express from "express";
const body_parser = require("body-parser");
require('dotenv').config(); // good practice to keep secret here
const { db } = require("./config/config");
import axios from 'axios';

const app = express();

app.use(body_parser.json());
app.listen(process.env.PORT || 8000, () => {
    console.log("App is Running");
});

// Message to show in 8000 port 
app.get("/", (req, res) => {
    res.status(200).send("Hello this is webhook");
});


interface Info {
    token: string,
    body: string,
    thread: string,
    id: string,
    member: string,
    createdAt: string,
}

async function sendDataToFCM(postData: Info) {
    try {
        const { data, status } = await axios({
            method: "POST",
            url: "https://fcm.googleapis.com/fcm/send",
            data: {
                to: postData.token,
                priority: "high",
                notification: {
                    body: "Tap here to open the app...",
                    title: "You have a new message",
                },
                data: {
                    message: postData.body,
                    threadId: postData.thread,
                    id: postData.id,
                    member: postData.member,
                    createdAt: postData.createdAt
                }
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "key=" + process.env.FirebaseServerKey,
            }
        });

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

app.post("/webhook/listen", async (req, res) => {
    let body_param = req.body;

    if (body_param['object']) {
        let thread = body_param['data']['object']['thread'];
        let id = body_param['data']['object']['id'];
        let member = body_param['member'];
        let body = body_param['data']['object']['text'];
        let createdAt = body_param['created_at'];

        const postData: Info = {
            body: body,
            thread: thread,
            id: id,
            member: member,
            createdAt: createdAt,
            token: ""
        };

        const snapshot = db.collection('Tokens').doc(member);
        const doc = await snapshot.get();
        if (!doc.exists) {
            console.log('No such document in Firebase!');
        } else {
            console.log("Thread : body -> " + thread + " : " + body);

            let token = doc.data().Token;
            postData.token = token;

            if (member === body_param.data.object.sender) { // dont send notification for user's own messages
                sendDataToFCM(postData);
            } else {
                console.log("User token is : " + token);
            }
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(200);
    }

});
