import React from "react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const mockUser = {
    email: "utente@casino.com",
    wallet: "0x1234...abcd",
    balance: 30
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center pt-32">
      <div className="w-full max-w-lg bg-black/60 border border-yellow-500 rounded-xl p-6 shadow-xl text-center">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Profilo</h2>
        <p className="text-lg">📧 {mockUser.email}</p>
        <p className="text-lg">💼 {mockUser.wallet}</p>
        <p className="text-2xl mt-4 font-bold text-green-400">Saldo: €{mockUser.balance}</p>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
