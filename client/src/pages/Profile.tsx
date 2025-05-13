import React from "react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Profilo</h1>
      <p>Username: {user?.username}</p>
      <p>Saldo ETH: {user?.balance}</p>
    </div>
  );
}
