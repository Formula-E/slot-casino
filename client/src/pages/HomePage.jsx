import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center justify-center px-4 relative">
      <header className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-black bg-opacity-80 z-50">
        <h1 className="text-2xl font-bold text-yellow-400">Casino Pro</h1>
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="text-white bg-yellow-500 px-3 py-2 rounded hover:bg-yellow-400"
        >
          ☰ Menu
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-6 bg-black border border-yellow-500 rounded-lg shadow-lg p-4 z-40 w-48 space-y-2"
          >
            <Link to="/slot" className="block text-white hover:text-yellow-300">🎰 Slot</Link>
            <Link to="/deposit" className="block text-white hover:text-yellow-300">💳 Ricarica</Link>
            <Link to="/profile" className="block text-white hover:text-yellow-300">👤 Profilo</Link>
            <Link to="/login" className="block text-white hover:text-yellow-300">🔐 Login</Link>
            <Link to="/register" className="block text-white hover:text-yellow-300">📝 Registrati</Link>
            <Link to="/admin" className="block text-white hover:text-yellow-300">🛠️ Admin</Link>
            <Link to="/telegram" className="block text-white hover:text-yellow-300">🤖 Telegram</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="text-center mt-32">
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">Benvenuto su Casino Pro</h2>
        <p className="text-lg text-gray-300">Sfida la sorte. Vinci in grande. Tutto con stile.</p>
        <Link to="/slot" className="mt-8 inline-block bg-yellow-500 text-black px-6 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition">
          🎰 Inizia a giocare
        </Link>
      </main>
    </div>
  );
};

export default HomePage;
