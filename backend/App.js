const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Varioc backend!');
});

// Route to handle contact form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // For now, we just log it to the server console
  console.log('New contact form submission:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  // Respond to frontend
  res.json({ status: 'success', message: 'Sporočilo je bilo poslano!' });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
