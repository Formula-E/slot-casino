import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white flex flex-col items-center justify-center px-4">
      {/* Sfondi animati */}
      <motion.div
        className="absolute inset-0 z-0 bg-[url('/casino-bg.jpg')] bg-cover bg-center opacity-10"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-10" />

      {/* Contenuto principale */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 drop-shadow-xl mb-6">🎰 Casino Pro</h1>
        <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto">Slot europee realistiche, ETH on-chain e Telegram WebApp — tutto in un unico casinò.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/slot" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-full shadow-lg transition">🎰 Gioca ora</Link>
          <Link to="/login" className="bg-white/10 hover:bg-white/20 text-yellow-300 font-bold py-3 px-6 rounded-full transition border border-yellow-500">🔐 Login</Link>
          <Link to="/register" className="bg-white/10 hover:bg-white/20 text-yellow-300 font-bold py-3 px-6 rounded-full transition border border-yellow-500">📝 Registrati</Link>
        </div>
      </motion.div>

      {/* Luci animate */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 blur-3xl opacity-10 rounded-full z-0"
        animate={{ x: [0, 300, -200, 0], y: [0, -150, 200, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 blur-3xl opacity-10 rounded-full z-0"
        animate={{ x: [0, -200, 150, 0], y: [0, 200, -200, 0] }}
        transition={{ duration: 40, repeat: Infinity }}
      />
    </div>
  );
};

export default HomePage;
