
const { WebSocketProvider } = require('ethers');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const provider = new WebSocketProvider(`wss://mainnet.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`);
const monitoredAddress = process.env.WALLET_ADDRESS.toLowerCase();

provider.on('pending', async (txHash) => {
  try {
    const tx = await provider.getTransaction(txHash);
    if (tx && tx.to && tx.to.toLowerCase() === monitoredAddress) {
      const valueEth = Number(tx.value.toString()) / 1e18;
      console.log(`📥 ETH ricevuto: ${valueEth} da ${tx.from}`);

      await mongoose.connect(process.env.MONGODB_URI);
      const user = await User.findOne({ wallet: tx.from.toLowerCase() });
      if (user) {
        user.balance += valueEth;
        await user.save();
        console.log(`✅ Saldo aggiornato per ${tx.from}`);
      } else {
        console.log(`⚠️ Nessun utente trovato con wallet ${tx.from}`);
      }
    }
  } catch (err) {
    console.error("Errore durante il monitoraggio:", err.message);
  }
});
