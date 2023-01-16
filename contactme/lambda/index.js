// RUNS ON AWS! (sdk in the path)

const aws = require('aws-sdk');

const ses = new aws.SES({ region: 'us-east-1' });

exports.handler = async function handler(event) {
  console.log('EVENT: ', event);
  // Extract the properties from the event body
  const { senderEmail, senderName, message } = JSON.parse(event.body);
  const params = {
    Destination: {
      ToAddresses: ['dvdrtrgn+test@gmail.com'],
    },
    // Interpolate the data in the strings to send
    Message: {
      Body: {
        Text: {
          Data: `
Message from ${senderName} - ${senderEmail}:
${message}
`,
        },
      },
      Subject: { Data: `Message from ${senderName}` },
    },
    Source: 'dvdrtrgn+test@gmail.com',
  };

  return ses.sendEmail(params).promise();
};
