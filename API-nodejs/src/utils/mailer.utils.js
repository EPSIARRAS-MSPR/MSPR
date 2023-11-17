const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (type, args, email) => {
    try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "mail.jeda1059.odns.fr",
            port: 26,
            secure: false,
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
                from: '"Arosaje email 👻" <arosaje@plant.com>', // sender address
                to: email, // list of receivers
                subject: "VALIDATION ✔", // Subject line
                text: `Votre code de vérification est : ${code}.`, // plain text body
                html: `<b>Votre code de vérification : ${code}.</b>`, // html body
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