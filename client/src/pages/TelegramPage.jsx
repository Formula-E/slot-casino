
import React, { useEffect, useState } from "react";
import axios from "axios";

function TelegramPage() {
  const [slot, setSlot] = useState("");
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");

  const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣", "💎"];

  const getInitData = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("initData") || "";
  };

  useEffect(() => {
    const initData = getInitData();
    if (!initData) return;

    axios.post("http://localhost:5000/api/telegram-login", { initData })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        setBalance(res.data.balance);
      })
      .catch(err => setMessage("Errore Telegram: " + err.message));
  }, []);

  const spin = () => {
    const rng = Math.random();
    const shouldLose = rng < 0.95;
    let combo;

    if (shouldLose) {
      combo = [symbols[0], symbols[1], symbols[2]];
      setMessage("Hai perso!");
      setBalance(prev => prev - 1);
    } else {
      const winSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      combo = [winSymbol, winSymbol, winSymbol];
      setMessage("Hai VINTO!");
      setBalance(prev => prev + 5);
    }

    setSlot(combo.join(" | "));
  };

  return (
    <div style={{ textAlign: "center", padding: 10 }}>
      <h2>🎰 Slot via Telegram</h2>
      <p>Saldo: {balance.toFixed(4)} ETH</p>
      <div style={{ fontSize: "2em", margin: "20px" }}>{slot}</div>
      <button onClick={spin} style={{ fontSize: "1.5em" }}>GIRA</button>
      <p>{message}</p>
    </div>
  );
}

export default TelegramPage;
