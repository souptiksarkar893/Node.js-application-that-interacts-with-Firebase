// const admin = require("firebase-admin");

// const serviceAccount = require("./config/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://form-project-8c61f-default-rtdb.firebaseio.com"
// });

// const db = admin.database();

// module.exports = { admin, db };

// app.get("/sum-amounts", async (req, res) => {
//   try {
//     const snapshot = await db.ref("sms").once("value");
//     const smsData = snapshot.val();
//     let totalAmount = 0;

//     Object.keys(smsData).forEach(smsId => {
//       totalAmount += smsData[smsId].amount;
//     });

//     res.status(200).json({ totalAmount });
//   } catch (error) {
//     console.error("Error calculating total amount:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });