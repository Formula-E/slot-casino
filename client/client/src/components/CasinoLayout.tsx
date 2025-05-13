import React from "react";

export default function CasinoLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white font-sans p-6">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl bg-zinc-800 p-4">
        {children}
      </div>
    </div>
  );
}
