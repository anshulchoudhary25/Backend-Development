const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3001; // different port so it doesn't clash with server.js

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'loginSecretKey',
  resave: false,
  saveUninitialized: true
}));

// In-memory "database" of registered users
const users = [];

// Home page — redirect based on login status
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

// Register page
app.get('/register', (req, res) => {
  res.send(`
    <h2>Register</h2>
    <form action="/register" method="post">
      <input type="text" name="username" placeholder="Username" required/><br/>
      <input type="password" name="password" placeholder="Password" required/><br/>
      <button type="submit">Register</button>
    </form>
    <a href="/login">Already have an account? Login</a>
  `);
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.send('Username already taken. <a href="/register">Try again</a>');
  }

  users.push({ username, password });
  res.send('Registration successful! <a href="/login">Login now</a>');
});

// Login page
app.get('/login', (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form action="/login" method="post">
      <input type="text" name="username" placeholder="Username" required/><br/>
      <input type="password" name="password" placeholder="Password" required/><br/>
      <button type="submit">Login</button>
    </form>
    <a href="/register">No account? Register</a>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.send('Invalid username or password. <a href="/login">Try again</a>');
  }

  req.session.user = { username: user.username };
  res.redirect('/dashboard');
});

// Middleware to protect routes
function authMiddleware(req, res, next) {
  if (req.session.user) next();
  else res.redirect('/login');
}

// Protected dashboard page
app.get('/dashboard', authMiddleware, (req, res) => {
  res.send(`
    <h2>Dashboard</h2>
    <p>Welcome, ${req.session.user.username}!</p>
    <a href="/logout">Logout</a>
  `);
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.listen(PORT, () => console.log(`Login system running at http://localhost:${PORT}`));