
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

// ROTTE

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Utente esistente' });

  const user = new User({ email, password });
  await user.save();
  res.json({ message: 'Registrazione completata' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ message: 'Credenziali errate' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, balance: user.balance });
});

app.get('/api/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ email: user.email, balance: user.balance });
});

app.listen(PORT, () => console.log(`🚀 Server avviato sulla porta ${PORT}`));
