const axios = require("axios");
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
    // Qui si potrebbe aggiornare MongoDB, notificare Telegram, ecc.
  }
}

setInterval(checkEthTransactions, 30000);
