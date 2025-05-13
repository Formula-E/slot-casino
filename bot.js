const TelegramBot = require("node-telegram-bot-api");

const token = "7669146887:AAE5DWLbqAS_T_nyz4J5z-sjWh8rmyG9q1E";
const webAppUrl = "https://slot-casino-gamma.vercel.app/telegram"; // ✅ link reale

const bot = new TelegramBot(token, { polling: true });

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
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, "🎰 In questa slot machine puoi vincere fantastici premi!");
});