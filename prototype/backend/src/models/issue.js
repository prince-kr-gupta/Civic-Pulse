const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Issue', IssueSchema);