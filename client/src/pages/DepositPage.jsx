
import React, { useState } from "react";
import { ethers } from "ethers";

function DepositPage() {
  const [status, setStatus] = useState("");
  const depositAddress = "0x8c2Cfbf83796d53AA4a571d183013E2CCdC0802b"; // tuo wallet

  const handleDeposit = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask non è installato.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: depositAddress,
        value: ethers.parseEther("0.01"), // importo fisso per ora
      });
      setStatus("Transazione inviata: " + tx.hash);
    } catch (err) {
      console.error(err);
      setStatus("Errore durante l'invio: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Ricarica ETH</h2>
      <p>Indirizzo ricarica: <code>{depositAddress}</code></p>
      <button onClick={handleDeposit}>Ricarica 0.01 ETH</button>
      <p>{status}</p>
    </div>
  );
}

export default DepositPage;
