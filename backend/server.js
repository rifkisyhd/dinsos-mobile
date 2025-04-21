// server.js
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8081;

// Enable CORS untuk semua rute
app.use(cors());

// Middleware untuk parsing JSON
app.use(express.json());

// Import route
const dataRoute = require('./routes/dataRoute');

// Gunakan route
app.use('/api', dataRoute);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});