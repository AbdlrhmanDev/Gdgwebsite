const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    console.log(`Attempting to send email... Host: ${process.env.SMTP_HOST}, Port: ${process.env.SMTP_PORT}, Secure: ${process.env.SMTP_PORT == 465}`);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        },
        const nodemailer = require('nodemailer');

        const sendEmail = async (options) => {
            console.log(`Attempting to send email... Host: ${process.env.SMTP_HOST}, Port: ${process.env.SMTP_PORT}, Secure: ${process.env.SMTP_PORT == 465}`);

            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: process.env.SMTP_PORT == 465,
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD
                },
                tls: {
                    ciphers: 'SSLv3'
                },
                family: 4
            });

            // Verify connection configuration
            try {
                await transporter.verify();
                console.log('SMTP Connection verified successfully');
            } catch (error) {
                console.error('SMTP Connection Verification Failed:', error);
                throw error; // Re-throw to be caught by controller
            }

            const message = {
                from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
                to: options.email,
                subject: options.subject,
                text: options.message
            };

            console.log('Sending email payload:', JSON.stringify({ ...message, text: '***' }, null, 2));

            const info = await transporter.sendMail(message);

            console.log('Message sent successfully. MessageID: %s', info.messageId);
        };

        module.exports = sendEmail;
