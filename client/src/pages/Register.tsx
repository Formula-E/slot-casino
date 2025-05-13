import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl">Registrazione</h1>
      <p>Per questa demo, usa qualsiasi nome utente. "admin" sblocca l'accesso admin.</p>
      <button onClick={handleRegister} className="bg-green-500 text-white p-2 mt-4">Vai al login</button>
    </div>
  );
}
