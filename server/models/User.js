const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  walletAddress: { type: String }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
