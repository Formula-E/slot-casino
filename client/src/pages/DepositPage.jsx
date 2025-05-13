import React from "react";
import { motion } from "framer-motion";

const DepositPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/60 border border-yellow-500 rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Ricarica</h2>
        <p className="text-sm text-gray-300 mb-4">Invia ETH al tuo wallet per ricaricare il saldo.</p>
        <input className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Wallet di destinazione" disabled value="0xYourCasinoWallet..." />
        <button className="w-full bg-yellow-400 text-black py-2 rounded font-bold hover:bg-yellow-300 transition">Copia Wallet</button>
      </div>
    </motion.div>
  );
};

export default DepositPage;
