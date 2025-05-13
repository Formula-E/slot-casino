const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: String,
  balance: { type: Number, default: 0 },
  lastDeposit: { type: String, default: null }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
