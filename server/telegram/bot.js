const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
require("dotenv").config();

// Connessione a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connesso (Telegram Bot)"))
  .catch(err => console.error("Errore MongoDB:", err));

// Modello utente
const User = mongoose.model("User", new mongoose.Schema({
  telegramId: String,
  username: String,
  balance: { type: Number, default: 0 },
}));

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  let user = await User.findOne({ telegramId: chatId });

  if (!user) {
    user = new User({
      telegramId: chatId,
      username: msg.from.username || msg.from.first_name,
      balance: 0
    });
    await user.save();
    bot.sendMessage(chatId, `Benvenuto ${user.username}! Il tuo conto è stato creato.`);
  } else {
    bot.sendMessage(chatId, `Bentornato ${user.username}! Il tuo saldo è ${user.balance} ETH.`);
  }
});

bot.onText(/\/saldo/, async (msg) => {
  const user = await User.findOne({ telegramId: msg.chat.id });
  if (user) {
    bot.sendMessage(msg.chat.id, `💰 Saldo attuale: ${user.balance.toFixed(4)} ETH`);
  } else {
    bot.sendMessage(msg.chat.id, "Utente non trovato. Usa /start per registrarti.");
  }
});

bot.onText(/\/gioca/, async (msg) => {
  const user = await User.findOne({ telegramId: msg.chat.id });
  if (!user) return bot.sendMessage(msg.chat.id, "Registrati prima con /start.");

  const win = Math.random() < 0.05;
  const amount = 0.1;
  user.balance += win ? amount : -amount;
  await user.save();

  const result = win ? `🎉 Hai vinto ${amount} ETH!` : `😞 Hai perso ${amount} ETH.`;
  bot.sendMessage(msg.chat.id, `${result}\nSaldo attuale: ${user.balance.toFixed(4)} ETH`);
});

module.exports = bot;
