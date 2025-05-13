import React from "react";

export default function Admin() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.isAdmin) return <p>Accesso negato</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Pannello Admin</h1>
      <p>Qui puoi vedere e gestire gli utenti (demo).</p>
    </div>
  );
}
