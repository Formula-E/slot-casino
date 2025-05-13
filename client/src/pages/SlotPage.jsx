// SlotPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useUserStore from '../store/userStore';
import './SlotStyles.css';

const symbols = ['🍒', '🔔', '🍋', '💎', '7️⃣', '🍀'];

const SlotPage = () => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { user, updateBalance } = useUserStore();

  const spinAudio = useRef(null);
  const winAudio = useRef(null);

  useEffect(() => {
    if (user.balance <= 0) {
      navigate('/deposit');
    }
  }, [user.balance, navigate]);

  const spin = () => {
    if (spinning || user.balance <= 0) return;

    spinAudio.current.play();

    const winChance = Math.random();
    const newReels = [
      Math.floor(Math.random() * symbols.length),
      Math.floor(Math.random() * symbols.length),
      Math.floor(Math.random() * symbols.length),
    ];

    setSpinning(true);
    setTimeout(() => {
      setReels(newReels);
      const isWin = newReels.every((val) => val === newReels[0]);

      if (isWin && winChance > 0.95) {
        updateBalance(user.balance + 20);
        setMessage('Hai vinto 20€! 🎉');
        winAudio.current.play();
      } else {
        updateBalance(user.balance - 1);
        setMessage('Ritenta!');
      }
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center pt-24 px-4">
      <audio ref={spinAudio} src="/sounds/spin.mp3" />
      <audio ref={winAudio} src="/sounds/win.mp3" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 shadow-lg flex justify-between items-center px-6 py-3 z-50 border-b border-yellow-500">
        <h1 className="text-2xl font-bold text-yellow-400">Casino Pro</h1>
        <nav className="flex gap-4 text-white">
          <Link to="/slot" className="hover:text-yellow-300 transition">Slot</Link>
          <Link to="/deposit" className="hover:text-yellow-300 transition">Ricarica</Link>
          <Link to="/profile" className="hover:text-yellow-300 transition">Profilo</Link>
          <span className="ml-4 text-yellow-400 font-bold">Saldo: €{user.balance.toFixed(2)}</span>
        </nav>
      </header>

      <h2 className="text-4xl font-bold mb-8 text-yellow-400 mt-4">Slot Machine</h2>
      <div className="slot-machine border-4 border-yellow-400 rounded-2xl shadow-2xl p-4 mb-6 bg-black bg-opacity-60">
        <div className={`reel-container ${spinning ? 'spinning' : ''}`}>
          {reels.map((r, i) => (
            <div key={i} className="reel">
              <div className="symbol">{symbols[r]}</div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={spin} disabled={spinning || user.balance <= 0} className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition">
        {spinning ? 'Girando...' : 'Gira!'}
      </button>
      {message && <p className="mt-6 text-xl text-green-400 animate-bounce">{message}</p>}
    </div>
  );
};

export default SlotPage;

/* SlotStyles.css */
.reel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100px;
  width: 300px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
}

.reel {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  animation: spinEffect 2s ease-in-out;
}

@keyframes spinEffect {
  0% { transform: translateY(-100px); opacity: 0; }
  50% { transform: translateY(20px); opacity: 1; }
  100% { transform: translateY(0); }
}

.symbol {
  text-shadow: 0 0 10px gold;
}

.spinning .reel {
  animation: spinEffect 2s ease-in-out;
}
