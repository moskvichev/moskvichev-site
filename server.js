const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
// Регистрация пользователя
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO auth (username, password, email) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, email], (err) => {
    if (err) {
      return res.status(400).send('Error registering user');
    }
    res.status(201).send('User registered');
  });
});

// Аутентификация пользователя
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM auth WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).send('Invalid credentials');
    }

    const user = results[0];
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      return res.json({ token });
    } else {
      return res.status(400).send('Invalid credentials');
    }
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
