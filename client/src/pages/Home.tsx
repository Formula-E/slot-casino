import React from "react";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Benvenuto {user?.username || "utente"}!</h1>
      <p>Saldo ETH: {user?.balance || 0}</p>
    </div>
  );
}
