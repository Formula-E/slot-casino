const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config(); // facoltativo, se usi .env

const token = process.env.BOT_TOKEN || "7669146887:AAE5DWLbqAS_T_nyz4J5z-sjWh8rmyG9q1E"; // meglio da .env
const webAppUrl = "https://slot-casino-gamma.vercel.app/telegram"; // URL WebApp
const bot = new TelegramBot(token, { polling: false });

const app = express();
app.use(bodyParser.json());

// Webhook endpoint per Telegram
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Imposta il webhook (solo al primo avvio o manualmente)
bot.setWebHook(`https://slot-casino-1.onrender.com/bot${token}`);

// Comando /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🎰 Benvenuto nella Slot Machine!", {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "🎰 Gioca ora",
          web_app: { url: webAppUrl }
        }
      ]]
    }
  });
});

// Comando /help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, "ℹ️ In questa slot puoi vincere premi! Premi 'Gioca ora' per iniziare.");
});

// Test root
app.get("/", (req, res) => {
  res.send("🤖 Bot attivo con webhook su Render");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Bot attivo su porta ${PORT}`);
});
