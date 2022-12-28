const firebase = require("firebase");

export const config = {
    firebaseConfig: {
        apiKey: "AIzaSyBAqy4p1yatL4Ksk5kJ9bxxqS8m2EJimEs",
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