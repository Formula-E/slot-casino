const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;
const webAppUrl = "https://slot-casino-gamma.vercel.app/telegram";
const bot = new TelegramBot(token, { polling: false });

const app = express();
app.use(bodyParser.json());

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.setWebHook(`https://tuo-nome.onrender.com/bot${token}`);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🎰 Benvenuto nella Slot Machine!", {
    reply_markup: {
      inline_keyboard: [[
        { text: "🎰 Gioca ora", web_app: { url: webAppUrl } }
      ]]
    }
  });
});

app.listen(3000, () => console.log("🤖 Bot attivo via webhook"));
