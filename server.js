const express = require('express');
const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require('./config/serviceAccountKey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://form-project-8c61f-default-rtdb.firebaseio.com"
});

const db = admin.database();
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the API. Use /sum-amounts to get the total amount.');
});

app.get('/sum-amounts', async (req, res) => {
  try {
    const snapshot = await db.ref('sms').once('value');
    const smsData = snapshot.val();
    let totalAmount = 0;

    if (smsData) {
      for (const smsId in smsData) {
        if (smsData.hasOwnProperty(smsId)) {
          totalAmount += smsData[smsId].amount;
        }
      }
    }

    res.status(200).json({ totalAmount });
  } catch (error) {
    console.error("Error calculating total amount:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const fetchAndFormatSmsData = async () => {
  try {
    const snapshot = await db.ref('sms').once('value');
    const smsData = snapshot.val();

    if (!smsData) {
      console.log("No data found");
      return;
    }

    const formattedSmsData = {};

    for (const smsId in smsData) {
      if (smsData.hasOwnProperty(smsId)) {
        const sms = smsData[smsId];
        const formattedTimestamp = formatTimestamp(sms.timestamp);

        formattedSmsData[smsId] = {
          ...sms,
          formattedTimestamp
        };
      }
    }

    await db.ref('formatted_sms').set(formattedSmsData);
    console.log("Formatted SMS data saved successfully");
  } catch (error) {
    console.error("Error fetching and formatting SMS data:", error);
  }
};

fetchAndFormatSmsData();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
