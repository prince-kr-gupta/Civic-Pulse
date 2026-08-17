const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

const issueRoutes = require('./routes/issueRoutes');
app.use('/api/issues', issueRoutes);

app.get('/', (req, res) => {
  res.send('Civic-Pulse Backend API is running!');
});

app.listen(PORT, () => {
  console.log(`Civic-Pulse server running on port ${PORT}`);
});