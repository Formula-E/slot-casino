import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣", "💎"];

const SlotPage = () => {
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(10);
  const [bet, setBet] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const spinAudio = useRef(null);
  const winAudio = useRef(null);

  const spin = () => {
    if (spinning || balance < bet) return;
    setSpinning(true);
    spinAudio.current?.play();

    setTimeout(() => {
      const rng = Math.random();
      let combo;
      if (rng < 0.95) {
        combo = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];
        setMessage("Hai perso!");
        setBalance(prev => prev - bet);
      } else {
        const winSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        combo = [winSymbol, winSymbol, winSymbol];
        setMessage(`🎉 Hai VINTO ${bet * 10}€!`);
        winAudio.current?.play();
        setBalance(prev => prev + bet * 10);
      }
      setReels(combo);
      setSpinning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center pt-24">
      <audio ref={spinAudio} src="/sounds/spin.mp3" />
      <audio ref={winAudio} src="/sounds/win.mp3" />

      <h2 className="text-4xl font-bold text-yellow-400 mt-4 mb-8">🎰 Slot Machine</h2>

      <motion.div className="text-6xl flex gap-6 mb-6">
        {reels.map((symbol, i) => (
          <motion.div
            key={i}
            animate={{ rotate: spinning ? 720 : 0 }}
            transition={{ duration: 1 }}
            className="px-6 py-4 bg-black bg-opacity-50 rounded-2xl shadow-inner border-2 border-yellow-500"
          >
            {symbol}
          </motion.div>
        ))}
      </motion.div>

      <div className="flex gap-4 items-center mb-4">
        <label className="text-white">Puntata:</label>
        <input
          type="number"
          value={bet}
          min={1}
          max={balance}
          onChange={(e) => setBet(Number(e.target.value))}
          className="text-black px-3 py-1 rounded w-24 text-center"
        />
      </div>

      <button
        onClick={spin}
        disabled={spinning || balance < bet}
        className="bg-yellow-400 text-black font-bold px-10 py-4 rounded-full shadow-lg hover:bg-yellow-300 transition"
      >
        {spinning ? "GIRANDO..." : "GIRA"}
      </button>

      <p className="mt-6 text-lg text-green-400 animate-pulse">{message}</p>
      <p className="text-sm text-gray-400">Saldo: €{balance}</p>
    </div>
  );
};

export default SlotPage;
