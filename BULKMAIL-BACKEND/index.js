const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || true,
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Origin", "X-Requested-With", "Accept"]
}))

app.use(express.json())

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});ch

const emailTemplate = (message, recipient) => ({
    from: process.env.GMAIL_USER,
    to: recipient,
    subject: 'You get Text Message from Your App!',
    text: message
  });

const sendMails = ({ msg, message, emailList = [] }) => {
    const emailText = msg || message || "";

    return new Promise(async (resolve, reject) => {
        try {
            for (const recipient of emailList) {
                if (!recipient) continue;

                const mailOptions = emailTemplate(emailText, recipient);
                await transporter.sendMail(mailOptions);
                console.log(`Email sent to ${recipient}`);
            }
            resolve("Success")
        } catch (error) {
            console.error('Error sending emails:', error.message);
            reject(error.message)
        }
    })
};

app.post("/sendemail",function(req,res){
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return res.status(503).send(false);
    }

    sendMails(req.body)
      .then((response) => {
        console.log(response)
        res.send(true);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(false);
      })
})

if (require.main === module) {
  const port = process.env.PORT || 5000
  app.listen(port, function(){
    console.log(`Server started on port ${port}`)
  })
}

module.exports = app