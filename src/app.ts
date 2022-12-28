import express from "express";
import { bigint } from "zod";
require('dotenv').config(); // good practice to keep secret here
const { db } = require("./config/config");

const app = express();

app.listen(process.env.PORT || 8000, () => {
    console.log("App is Running");
});

// Message to show in 8000 port 
app.get("/", (req, res) => {
    res.status(200).send("Hello this is webhook");
});

app.post("/webhook/listen", async (req, res) => {
    console.log("Inside webhook/listen");
    let body_param = req.body;
    console.log(req.body['data']['object']['id']);
    // if (body_param.object) { // if it has something
    //     let thread = body_param.data.object.thread;
    //     let id = body_param.data.object.id;
    //     let member = body_param.member;
    //     let body = body_param.data.object.text;
    //     let createdAt = body_param.created_at;
    //     let media = body_param.data.object.attachments;

    //     const snapshot = db.collection('Tokens').doc(member);
    //     const doc = await snapshot.get();
    //     if (!doc.exists) {
    //         console.log('No such document in Firebase!!');
    //     } else {
    //         console.log("Thread : body -> " + thread + " : " + body);

    //         let token = doc.data().Token;

    //         if (member === body_param.data.object.sender) { // dont send notification for user's own messages
    //         } else {
    //             console.log("User token is : " + token);
    //         }
    //     }
    //     res.sendStatus(200);
    // } else {
    //     res.sendStatus(200);
    // }

});
