import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import SlotPage from "./pages/SlotPage";
import DepositPage from "./pages/DepositPage";
import AdminPage from "./pages/AdminPage";          // ✅ AGGIUNGI QUESTO
import TelegramPage from "./pages/TelegramPage";    // ✅ E QUESTO

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SlotPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/telegram" element={<TelegramPage />} />
      </Routes>
    </Router>
  );
}

export default App;
