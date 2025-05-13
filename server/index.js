
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connessione a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Middleware autenticazione
const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

// Schemi MongoDB
const User = require('./models/User');

// const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
  balance: { type: Number, default: 0 },
}));

// Rotte
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User exists' });

  const user = new User({ email, password });
  await user.save();
  res.json({ message: 'Registered' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, balance: user.balance });
});

app.get('/api/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ email: user.email, balance: user.balance });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/api/admin/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

app.get('/api/admin/withdrawals', async (req, res) => {
  const db = mongoose.connection;
  const withdrawals = await db.collection('withdrawals').find({}).toArray();
  res.json(withdrawals);
});

const crypto = require('crypto');
const qs = require('querystring');

app.post('/api/telegram-login', async (req, res) => {
  const initData = req.body.initData;
  if (!initData) return res.status(400).json({ message: 'Missing initData' });

  const data = qs.parse(initData);
  const hash = data.hash;
  delete data.hash;

  const dataCheckString = Object.keys(data).sort().map(k => `${k}=${data[k]}`).join('\n');
  const secretKey = crypto.createHash('sha256').update(process.env.BOT_TOKEN).digest();
  const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  if (hmac !== hash) return res.status(403).json({ message: 'Invalid hash' });

  const telegramId = data.id;
  const email = `tg_${telegramId}@tg.login`;

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, wallet: "", balance: 5 });
    await user.save();
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, balance: user.balance });
});
