text: options.message
    };

const info = await transporter.sendMail(message);

console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
