const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Origin", "X-Requested-With", "Accept"]
}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Origin, X-Requested-With, Accept");
  res.send();
});

app.use(express.json())

//Install NODEMAILER
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

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
    sendMails(req.body)
      .then((response) => {
        console.log(response)
        res.send(true);
      })
      .catch((error) => {
        console.error(error);
        res.send(false);
      })
})

app.listen(process.env.PORT || 5000,function(){
    console.log("Server Started.....")
})