
import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setProfile(res.data);
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profilo</h2>
      <p>Email: {profile.email}</p>
      <p>Saldo: {profile.balance} ETH</p>
    </div>
  );
}

export default ProfilePage;
