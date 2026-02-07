const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file at "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// Handle form submission (for the contact form)
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Config Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'charlielai3@gmail.com', 
            pass: 'ljry kadw mffw nnwy'        
        }
    });

    const mailOptions = {
        from: email,
        replyTo: email,  
        to: 'charlielai3@gmail.com',  
        subject: `Message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email.');
        }
        res.send('Message sent successfully!');
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
