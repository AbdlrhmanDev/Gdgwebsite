const sgMail = require('@sendgrid/mail');

const sendEmail = async (options) => {
    console.log(`Attempting to send email via SendGrid to: ${options.email}`);

    // Set SendGrid API Key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const message = {
        to: options.email,
        from: process.env.FROM_EMAIL, // Must be a verified sender in SendGrid
        subject: options.subject,
        text: options.message,
    };

    console.log('Sending email payload:', JSON.stringify({ ...message, text: '***' }, null, 2));

    try {
        const response = await sgMail.send(message);
        console.log('Email sent successfully via SendGrid. Status:', response[0].statusCode);
    } catch (error) {
        console.error('SendGrid Error:', error);
        if (error.response) {
            console.error('SendGrid Error Body:', error.response.body);
        }
        throw error;
    }
};

module.exports = sendEmail;
