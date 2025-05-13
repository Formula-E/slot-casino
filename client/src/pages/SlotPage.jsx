import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣", "💎"];

function SlotPage() {
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(10);
  const [bet, setBet] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const spinAudio = useRef(null);
  const winAudio = useRef(null);

  useEffect(() => {
    let interval;
    if (autoPlay && !spinning && balance >= bet) {
      interval = setInterval(() => {
        spin();
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [autoPlay, spinning, balance, bet]);

  const spin = () => {
    if (spinning || balance < bet) return;
    setSpinning(true);
    setSpinCount(prev => prev + 1);
    spinAudio.current?.play();

    setTimeout(() => {
      const rng = Math.random();
      let combo;
      if (rng < 0.95) {
        combo = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)]
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

  useEffect(() => {
    if (autoPlay && balance < bet) {
      setAutoPlay(false);
    }
  }, [balance, bet, autoPlay]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center pt-24 px-4">
      <audio ref={spinAudio} src="/sounds/spin.mp3" />
      <audio ref={winAudio} src="/sounds/win.mp3" />

      <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 shadow-lg flex justify-between items-center px-6 py-3 z-50 border-b border-yellow-500">
        <h1 className="text-2xl font-bold text-yellow-400">Casino Pro</h1>
        <nav className="flex gap-4 text-white">
          <Link to="/slot" className="hover:text-yellow-300 transition">Slot</Link>
          <Link to="/deposit" className="hover:text-yellow-300 transition">Ricarica</Link>
          <Link to="/profile" className="hover:text-yellow-300 transition">Profilo</Link>
          <span className="ml-4 text-yellow-400 font-bold">Saldo: €{balance}</span>
        </nav>
      </header>

      <h2 className="text-4xl font-bold text-yellow-400 mt-12 mb-8">🎰 Slot Machine Deluxe</h2>

      <motion.div className="text-6xl flex gap-6 mb-6" initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              {reels.map((symbol, i) => (
                <motion.div key={i} animate={{ rotate: spinning ? 720 : 0 }} transition={{ duration: 1 }} className="px-6 py-4 bg-black bg-opacity-50 rounded-2xl shadow-inner border-2 border-yellow-500">
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
        <button
          onClick={() => setAutoPlay(prev => !prev)}
          className={`px-4 py-2 rounded font-bold ${autoPlay ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {autoPlay ? 'Stop Autoplay' : 'Autoplay'}
        </button>
      </div>

      <button
        onClick={spin}
        disabled={spinning || balance < bet}
        className="bg-yellow-400 text-black font-bold px-10 py-4 rounded-full shadow-lg hover:bg-yellow-300 transition"
      >
        {spinning ? "GIRANDO..." : "GIRA"}
      </button>

      <p className="mt-6 text-lg text-green-400 animate-pulse">{message}</p>
      <p className="text-sm text-gray-400">Giri totali: {spinCount}</p>

      <footer className="w-full text-center text-gray-400 mt-16 py-4 border-t border-yellow-900">
        <p className="text-sm">&copy; 2025 Casino Pro. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}

export default SlotPage;
