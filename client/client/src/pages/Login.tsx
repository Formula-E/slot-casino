import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = { username, balance: 0, isAdmin: username === "admin" };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl">Login</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 my-2"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2">Login</button>
    </div>
  );
}
