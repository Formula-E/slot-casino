
import React, { useState } from "react";

function SlotPage() {
  const [result, setResult] = useState("");
  const [balance, setBalance] = useState(10); // Simulato, verrà poi legato a MongoDB
  const [message, setMessage] = useState("");

  const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣", "💎"];

  const spin = () => {
    const rng = Math.random();
    const shouldLose = rng < 0.95; // 95% delle volte perde l'utente
    let combo;

    if (shouldLose) {
      combo = [symbols[0], symbols[1], symbols[2]];
      setMessage("Hai perso!");
      setBalance(balance - 1);
    } else {
      const winSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      combo = [winSymbol, winSymbol, winSymbol];
      setMessage("Hai VINTO!");
      setBalance(balance + 5);
    }

    setResult(combo.join(" | "));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🎰 Buffalo Blitz Slot</h1>
      <p>Saldo: {balance} ETH</p>
      <div style={{ fontSize: "2em", margin: "20px" }}>{result}</div>
      <button onClick={spin} style={{ fontSize: "1.5em", padding: "10px 20px" }}>
        GIRA!
      </button>
      <p>{message}</p>
    </div>
  );
}

export default SlotPage;
