import twilio from 'twilio';

const accountSid = 'AC28d2903bcf25eefdb0747e2f59f3bab0';
const authToken = 'a5f46daa0bf7c6c5ec091f9f1432c0d1';
const client = twilio(accountSid, authToken);

client.messages
    .create({
        body: 'hello this is ritesh',
        from: '+12766378857',
        to: '+917597372851',
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error("Error sending message:", error));
// only for testing api Ritesh TWilio acc.