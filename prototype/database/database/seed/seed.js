const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Issue = require('./models/issue');
const issuesData = require('./database/seed/issue.json');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB for seeding...');
    await Issue.deleteMany({});
    await Issue.insertMany(issuesData);
    console.log('Database seeded with sample issues!');
    process.exit();
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });