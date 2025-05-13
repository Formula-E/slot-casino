const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemi
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  wallet: String,
  balance: { type: Number, default: 10 },
  telegram_id: String,
  isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);

// Middleware per autenticazione
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token mancante" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: "Token invalido" });
  }
};

// Rotte
app.post("/api/register", async (req, res) => {
  const { email, password, wallet } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Email già registrata" });
  const user = await User.create({ email, password, wallet });
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ error: "Credenziali errate" });
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});

app.get("/api/profile", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ email: user.email, balance: user.balance, wallet: user.wallet });
});

app.get("/api/users", authenticate, async (req, res) => {
  const me = await User.findById(req.user.id);
  if (!me.isAdmin) return res.status(403).json({ error: "Accesso negato" });
  const users = await User.find();
  res.json(users);
});

app.post("/api/update-balance", authenticate, async (req, res) => {
  const me = await User.findById(req.user.id);
  if (!me.isAdmin) return res.status(403).json({ error: "Accesso negato" });
  const { userId, balance } = req.body;
  await User.findByIdAndUpdate(userId, { balance });
  res.json({ success: true });
});

app.post("/api/telegram-user", async (req, res) => {
  const { telegram_id, username, first_name } = req.body;
  let user = await User.findOne({ telegram_id });
  if (!user) {
    user = await User.create({
      telegram_id,
      email: `${username}@telegram`,
      balance: 10,
      wallet: "",
    });
  }
  res.json({ balance: user.balance });
});

// Polling delle ricariche ETH
app.get("/api/check-eth", async (req, res) => {
  const wallet = process.env.WALLET_ADDRESS;
  const infura = process.env.INFURA_PROJECT_ID;
  const url = `https://mainnet.infura.io/v3/${infura}`;
  // Nota: semplificato per demo. Usa websocket o event listener in prod.
  res.json({ message: "Polling ETH non implementato in dettaglio qui." });
});

app.listen(PORT, () => console.log("✅ Server avviato sulla porta " + PORT));
