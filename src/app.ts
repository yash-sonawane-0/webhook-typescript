import express from "express";
import { initializeApp } from 'firebase/app'
import { config } from "./config/config";
require('dotenv').config(); // good practice to keep secret here

initializeApp(config.firebaseConfig);

const app = express();

app.listen(process.env.PORT || 8000, () => {
    console.log("App is Running");
});

// Message to show in 8000 port 
app.get("/", (req, res) => {
    res.status(200).send("Hello this is webhook");
});

