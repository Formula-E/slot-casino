const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let lastTx = null;

async function checkEthTransactions() {
  const res = await axios.get(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${process.env.WALLET_ADDRESS}&sort=desc&apikey=4UE2M8CBBPCWSFKQIK3D6ZKWU2ZID412AQ`
  );
  const txs = res.data.result;
  if (txs.length && txs[0].hash !== lastTx && txs[0].to.toLowerCase() === process.env.WALLET_ADDRESS.toLowerCase()) {
    lastTx = txs[0].hash;
    console.log("Nuovo deposito ricevuto:", txs[0].value / 1e18, "ETH");
    // Aggiorna MongoDB con la nuova transazione
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db("casino_pronto");
    const collection = db.collection("transactions");
    await collection.insertOne({
      hash: txs[0].hash,
      from: txs[0].from,
      to: txs[0].to,
      value: txs[0].value / 1e18,
      timestamp: new Date(parseInt(txs[0].timeStamp) * 1000),
    });
    await client.close();

    // Notifica Telegram
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    const message = `Nuovo deposito ricevuto: ${txs[0].value / 1e18} ETH da ${txs[0].from}`;
    await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      chat_id: telegramChatId,
      text: message,
    });
  }
}

setInterval(checkEthTransactions, 30000);
