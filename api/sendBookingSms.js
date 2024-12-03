import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

// Twilio client initialization
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins or replace '*' with your front-end domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow Content-Type header

  // Handle OPTIONS preflight request (necessary for CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Respond to preflight request
  }

  // POST request to send SMS
  if (req.method === 'POST') {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({ error: 'Missing phoneNumber or message' });
    }

    try {
      const response = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number from environment variables
        to: phoneNumber,
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
// const authToken = 'e1093e86e0617304bea2ad645d26776c';
// const client = twilio(accountSid, authToken);

// client.messages
//     .create({
//         body: 'hello this is ritesh',
//         from: '+17754179014',
//         to: '+917597372851',
//     })
//     .then(message => console.log(message.sid))
//     .catch(error => console.error("Error sending message:", error));
