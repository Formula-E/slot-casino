import React from "react";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col justify-center items-center text-white px-4">
      <div className="bg-black/70 border border-yellow-500 rounded-xl p-8 shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400">Login</h2>
        <form className="space-y-4">
          <input className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Email" />
          <input type="password" className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Password" />
          <button className="w-full bg-yellow-400 text-black py-2 rounded font-bold hover:bg-yellow-300 transition">Accedi</button>
        </form>
      </div>
    </motion.div>
  );
};

export default LoginPage;
