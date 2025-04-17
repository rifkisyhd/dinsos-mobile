// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Import route
const dataRoute = require('./routes/dataRoute');

// Gunakan route
app.use('/api', dataRoute);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
app.get('/', (req, res) => {
  res.send('Server is running');
  });
});