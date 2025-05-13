
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import SlotPage from "./pages/SlotPage";
import HomePage from "./pages/HomePage";
import DepositPage from "./pages/DepositPage";
import AdminPage from "./pages/AdminPage";
import TelegramPage from "./pages/TelegramPage";

function App() {
  return (
 <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/deposit" element={<DepositPage />} />
  <Route path="/admin" element={<AdminPage />} />
  <Route path="/telegram" element={<TelegramPage />} />
  <Route path="/slot" element={<SlotPage />} />   {/* 👈 AGGIUNGI QUESTA */}
</Routes> 
  
  );
}

export default App;
