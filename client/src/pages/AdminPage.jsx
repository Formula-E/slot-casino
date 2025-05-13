
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await axios.get("http://localhost:5000/api/admin/users");
      const withdrawRes = await axios.get("http://localhost:5000/api/admin/withdrawals");
      setUsers(userRes.data);
      setWithdrawals(withdrawRes.data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>
      <h3>Utenti</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr><th>Email</th><th>Wallet</th><th>Saldo (ETH)</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.wallet}</td>
              <td>{u.balance.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: 30 }}>Prelievi in attesa</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr><th>User</th><th>Wallet</th><th>Importo</th><th>Data</th><th>Status</th></tr>
        </thead>
        <tbody>
          {withdrawals.map(w => (
            <tr key={w._id}>
              <td>{w.userId}</td>
              <td>{w.wallet}</td>
              <td>{w.amount}</td>
              <td>{new Date(w.date).toLocaleString()}</td>
              <td>{w.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
