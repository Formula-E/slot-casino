const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = mongoose.model("User", new mongoose.Schema({
  telegramId: String,
  username: String,
  balance: Number
}));

// GET saldo per Telegram WebApp
router.get("/balance/:telegramId", async (req, res) => {
  const user = await User.findOne({ telegramId: req.params.telegramId });
  if (!user) return res.status(404).json({ balance: 0 });
  res.json({ balance: user.balance.toFixed(4) });
});

// POST spin per Telegram WebApp
router.post("/spin/:telegramId", async (req, res) => {
  const user = await User.findOne({ telegramId: req.params.telegramId });
  if (!user) return res.status(404).json({ result: "Utente non trovato", balance: 0 });
  const win = Math.random() < 0.05;
  const amount = 0.1;
  user.balance += win ? amount : -amount;
  await user.save();
  res.json({ result: win ? "🎉 Hai vinto 0.1 ETH!" : "😞 Hai perso 0.1 ETH.", balance: user.balance.toFixed(4) });
});

module.exports = router;
