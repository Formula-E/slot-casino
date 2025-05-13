const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// User model
const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  password: String,
  balance: Number,
  isAdmin: Boolean
}));

// Middleware auth
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch {
    res.sendStatus(403);
  }
}

// Register
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).send("Utente già esistente");
  const user = new User({ username, password, balance: 0, isAdmin: username === "admin" });
  await user.save();
  res.send("Registrazione completata");
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).send("Credenziali errate");
  const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
  res.json({ token, user });
});

// Slot spin
app.post("/api/spin", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);
  const win = Math.random() < 0.05;
  user.balance += win ? 0.1 : -0.1;
  await user.save();
  res.json({ result: win ? "Hai vinto 0.1 ETH!" : "Hai perso 0.1 ETH.", balance: user.balance });
});

// Saldo
app.get("/api/balance", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ balance: user.balance });
});

app.listen(PORT, () => console.log("Server attivo su porta", PORT));

app.use("/api/telegram", require("./routes/telegram"));
