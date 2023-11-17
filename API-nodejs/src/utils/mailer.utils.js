const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (type, args, email) => {
    try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "anatra.o2switch.net",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_SMTP, // generated ethereal user
                pass: process.env.PASSWORD_SMTP, // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info;

        if (type === "accountVerification") {
            const { code } = args;

            // send mail with defined transport object
            info = await transporter.sendMail({
                from: '"MyAPI 👻" <myapi@example.com>', // sender address
                to: email, // list of receivers
                subject: "Account verification ✔", // Subject line
                text: `Your account verification code is : ${code}.`, // plain text body
                html: `<b>Your account verification code is : ${code}.</b>`, // html body
            });

        }

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    } catch (error) {
        return console.error(error);
    }
}

module.exports = {
    sendMail
}