const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/start', async (req, res) => {
  const { telegramId } = req.body;

  let user = await User.findOne({ telegramId });
  if (!user) {
    user = new User({ telegramId });
    await user.save();
  }

  res.json({ message: 'Utente verificato o creato', user });
});

module.exports = router;
