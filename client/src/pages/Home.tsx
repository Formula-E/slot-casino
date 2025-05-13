import React from "react";
import { motion } from "framer-motion";
import CasinoLayout from "../components/CasinoLayout";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <CasinoLayout>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Benvenuto {user?.username || "ospite"}</h1>
        <p className="text-lg">Saldo ETH: {user?.balance || 0}</p>
      </motion.div>
    </CasinoLayout>
  );
}
