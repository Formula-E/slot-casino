
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connesso'))
  .catch(err => console.error('❌ Errore MongoDB:', err));

// Middleware auth
const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token mancante' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalido' });
  }
};

// Middleware admin
const admin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Accesso solo admin' });
  }
  next();
};

// ROTTE BASE
app.post('/api/register', async (req, res) => {
  const { email, password, wallet } = req.body;
  try {
    const user = new User({ email, password, wallet: wallet.toLowerCase(), balance: 0 });
    await user.save();
    res.status(201).json({ message: 'Registrato' });
  } catch (err) {
    res.status(500).json({ message: 'Errore registrazione', error: err });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(404).json({ message: 'Credenziali errate' });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Errore login', error: err });
  }
});

// ROTTA ADMIN PROTETTA
app.get('/api/admin/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Errore recupero utenti', error: err });
  }
});

// START SERVER
app.listen(PORT, () => console.log(`🚀 Server attivo su http://localhost:${PORT}`));
