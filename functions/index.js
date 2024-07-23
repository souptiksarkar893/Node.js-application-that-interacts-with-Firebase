const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "http://localhost:9000?ns=form-project-8c61f",
});

const db = admin.database();
const app = express();

app.get("/sum-amounts", async (req, res) => {
  try {
    const snapshot = await db.ref("sms").once("value");
    const smsData = snapshot.val();
    let totalAmount = 0;

    if (smsData) {
      Object.entries(smsData).forEach(([smsId, sms]) => {
        totalAmount += sms.amount;
      });
    }

    res.status(200).json({totalAmount});
  } catch (error) {
    console.error("Error calculating total amount:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

exports.api = functions.https.onRequest(app);
