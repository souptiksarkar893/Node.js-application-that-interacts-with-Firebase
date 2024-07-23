const { db } = require('./firebaseAdmin');
const moment = require('moment');

db.ref('sms').once('value', snapshot => {
  const smsData = snapshot.val();
  const formattedSmsData = {};

  for (const smsId in smsData) {
    const sms = smsData[smsId];
    const formattedTimestamp = moment(sms.timestamp).format('YYYY-MM-DD HH:mm:ss');

    formattedSmsData[smsId] = {
      ...sms,
      formattedTimestamp
    };
  }

  db.ref('formatted_sms').set(formattedSmsData, error => {
    if (error) {
      console.error('Error saving formatted SMS data:', error);
    } else {
      console.log('Formatted SMS data saved successfully.');
    }
  });
}, error => {
  console.error('Error fetching SMS data:', error);
});
