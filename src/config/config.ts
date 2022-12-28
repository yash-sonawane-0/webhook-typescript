const firebase = require("firebase-admin");
require('dotenv').config();

export const config = {
    firebaseConfig: {
        apiKey: process.env.FirebaseApiKey,
        authDomain: "allara-staging.firebaseapp.com",
        projectId: "allara-staging",
        storageBucket: "allara-staging.appspot.com",
        messagingSenderId: "180541507023",
        appId: "1:180541507023:web:3fad78110bdb77da1a3eba",
        measurementId: "G-N2PDEBSJ4W"
    }
};

firebase.initializeApp(config.firebaseConfig);
const db = firebase.firestore();
module.exports = { db };