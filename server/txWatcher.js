
const { WebSocketProvider } = require('ethers');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const provider = new WebSocketProvider(`wss://mainnet.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`);
const monitoredAddress = process.env.WALLET_ADDRESS.toLowerCase();

console.log("⏳ In ascolto di transazioni ETH in entrata...");

provider.on('pending', async (txHash) => {
  try {
    const tx = await provider.getTransaction(txHash);
    if (!tx || !tx.to) return;

    if (tx.to.toLowerCase() === monitoredAddress) {
      const valueEth = Number(tx.value.toString()) / 1e18;

      await mongoose.connect(process.env.MONGODB_URI);
      const user = await User.findOne({ wallet: tx.from.toLowerCase() });

      if (user) {
        user.balance += valueEth;
        await user.save();
        console.log(`✅ Ricevuti ${valueEth} ETH da ${tx.from} → saldo aggiornato`);
      } else {
        console.log(`⚠️ Nessun utente trovato con wallet ${tx.from}`);
      }
    }
  } catch (error) {
    console.error("❌ Errore nel monitoraggio transazione:", error.message);
  }
});
