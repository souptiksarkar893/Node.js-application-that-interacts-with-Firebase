# Node.js-application-that-interacts-with-Firebase

## Overview

This project demonstrates how to set up a Node.js application with Firebase to:
1. Fetch data from a Firebase Realtime Database.
2. Format timestamps and save the formatted data back to the database.
3. Create a Firebase Cloud Function API to calculate the total amount from SMS entries.

The project uses the Firebase Realtime Database and Firebase Cloud Functions. It includes local testing with Firebase Emulators and configuration for deploying to Firebase.

## Table of Contents

- [Setup Firebase Project](#setup-firebase-project)
- [Initialize Node.js Project](#initialize-nodejs-project)
- [Initialize Firebase Admin SDK](#initialize-firebase-admin-sdk)
- [Fetch and Format SMS Data](#fetch-and-format-sms-data)
- [Create Firebase Cloud Function API](#create-firebase-cloud-function-api)
- [Running the Project Locally](#running-the-project-locally)
- [Testing the API Endpoint](#testing-the-api-endpoint)
- [Deployment](#deployment)
- [License](#license)

## Setup Firebase Project

1. **Create a Firebase Project:**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project and follow the setup instructions.

2. **Set Up Firebase Realtime Database:**
   - In the Firebase Console, navigate to "Realtime Database" and set up the database.

3. **Enable Firebase Cloud Functions:**
   - Navigate to "Functions" in the Firebase Console and set up Cloud Functions.

## Initialize Node.js Project

1. **Initialize the Project:**
   - Create a new directory for your project.
   - Run `npm init -y` to initialize a Node.js project.

2. **Install Dependencies:**
   - Run `npm install express firebase-admin firebase-functions` to install required packages.

## Initialize Firebase Admin SDK

1. **Create a Service Account:**
   - In the Firebase Console, navigate to "Project Settings" > "Service accounts".
   - Generate a new private key and download the JSON file.

2. **Configure Firebase Admin SDK:**
   - Place the downloaded JSON file in a `config` directory.
   - Update the path to this file in your `server.js` file.

## Fetch and Format SMS Data

1. **Add SMS Data to Firebase Realtime Database:**
   - Navigate to "Realtime Database" and add data to the `sms` node using the following format:

   ```json
   {
     "sms": {
       "sms1": {
         "message": "Payment received",
         "amount": 100,
         "timestamp": 1658323200000
       },
       "sms2": {
         "message": "Payment sent",
         "amount": 50,
         "timestamp": 1658409600000
       },
       "sms3": {
         "message": "Payment received",
         "amount": 200,
         "timestamp": 1658496000000
       }
     }
   }


   Running the Project Locally
Start the Firebase Emulators:

Run firebase emulators:start to start local emulators for Realtime Database and Functions.
Test Locally:

Open your browser and navigate to http://localhost:3000/sum-amounts to test the local Express server.
Ensure the Realtime Database emulator is running and accessible.
Testing the API Endpoint
Local Testing:
Use the following URL to test the API locally: http://localhost:5001/form-project-8c61f/us-central1/api/sum-amounts.
