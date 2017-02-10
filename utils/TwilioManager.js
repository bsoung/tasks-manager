var twilio = require('twilio');

module.exports = {
    sendSMS: function(recipientNumber, message) {
        return new Promise(function(resolve, reject) {
            if (recipientNumber.indexOf('+1') == -1) {
                recipientNumber = '+1' + recipientNumber;
            }

            var client = new twilio.RestClient(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

            client.messages.create({
                body: message,
                to: recipientNumber, // Text this number
                from: process.env.TWILIO_NUMBER
            }, function(err, message) {

                if (err) {
                	reject(err);
                    return;
                }

                resolve(message);

            });

        });

    }
}
