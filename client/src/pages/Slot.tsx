import React, { useState } from "react";

export default function Slot() {
  const [result, setResult] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const spin = () => {
    const win = Math.random() < 0.05; // Solo il 5% vince
    const updatedUser = {
      ...user,
      balance: user.balance + (win ? 0.1 : -0.1)
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setResult(win ? "Hai vinto 0.1 ETH!" : "Hai perso 0.1 ETH.");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Slot Machine</h1>
      <p>Saldo: {user?.balance} ETH</p>
      <button onClick={spin} className="bg-purple-500 text-white p-2 my-2">SPIN</button>
      <p>{result}</p>
    </div>
  );
}
