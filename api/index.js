const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post("/api", (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'devrimeworks@gmail.com',
            pass: 'ngydfpswvjtdebhv'
        } 
    })

    const mailOptions = {
        from: 'contact@devrime.com',
        to: 'contact@devrime.com',
        subject: `Message from ${req.body.name} : ${req.body.email}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        }
        else {
            console.log('Email sent: ' + info.response);
            res.send("success");
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

module.exports = app;