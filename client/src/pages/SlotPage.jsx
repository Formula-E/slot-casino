
import React, { useState } from "react";
import { motion } from "framer-motion";

function SlotPage() {
  const [slot, setSlot] = useState("");
  const [message, setMessage] = useState("");
  const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣", "💎"];

  const spin = () => {
    const rng = Math.random();
    let combo;
    if (rng < 0.95) {
      combo = [symbols[0], symbols[1], symbols[2]];
      setMessage("Hai perso!");
    } else {
      const win = symbols[Math.floor(Math.random() * symbols.length)];
      combo = [win, win, win];
      setMessage("Hai VINTO!");
    }
    setSlot(combo.join(" | "));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>🎰 SLOT MACHINE</h2>
      <motion.div
        style={{ fontSize: "2em", marginBottom: "20px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1 }}
      >
        {slot}
      </motion.div>
      <button onClick={spin} className="px-8 py-4 bg-blue-500 text-white rounded-lg">GIRA</button>
      <p>{message}</p>
    </div>
  );
}

export default SlotPage;
