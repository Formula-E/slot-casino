// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white pt-24 px-4 flex flex-col items-center">
      <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 shadow-lg flex justify-between items-center px-6 py-3 z-50 border-b border-yellow-500">
        <h1 className="text-2xl font-bold text-yellow-400">Casino Pro</h1>
        <nav className="flex gap-4 text-white">
          <Link to="/slot" className="hover:text-yellow-300 transition">Slot</Link>
          <Link to="/deposit" className="hover:text-yellow-300 transition">Ricarica</Link>
          <Link to="/profile" className="hover:text-yellow-300 transition">Profilo</Link>
        </nav>
      </header>

      <div className="text-center mt-24">
        <h2 className="text-5xl font-extrabold text-yellow-400 mb-6 animate-pulse">Benvenuto su Casino Pro</h2>
        <p className="text-lg mb-8 text-gray-300 max-w-xl mx-auto">
          Vivi l'esperienza del casinò direttamente online con le nostre slot realistiche, premi avvincenti e grafica immersiva ispirata a 888casino.
        </p>
        <Link to="/slot" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-300 transition text-xl">
          Inizia a giocare
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
