import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

// Twilio client initialization
// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );
//new api new acc...
const accountSid = 'AC28d2903bcf25eefdb0747e2f59f3bab0';
const authToken = 'e20e7d6e2d7f3606dbf27b7ae74b3451';
const client = twilio(accountSid, authToken);
export default async (req, res) => {
 
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); 
  }

  
  if (req.method === 'POST') {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({ error: 'Missing phoneNumber or message' });
    }

    try {
      const response = await client.messages.create({
        body: message,
        from: '+12766378857',
        to: '+917597372851',
      });
      return res.status(200).json({ success: true, sid: response.sid });
    } catch (error) {
      return res.status(500).json({ error: error.message, details: error });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

// import twilio from 'twilio';

// const accountSid = 'ACf9caf1c253f9185a3c388b850a9b6c25';
// const authToken = '91d118fff831c3594ca2948ea29389f2';
// const client = twilio(accountSid, authToken);

// client.messages
//     .create({
//         body: 'hello this is ritesh',
//         from: '+17754179014',
//         to: '+917597372851',
//     })
//     .then(message => console.log(message.sid))
//     .catch(error => console.error("Error sending message:", error));
