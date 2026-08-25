const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3002; // different port from the other two files

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'todoSecretKey',
  resave: false,
  saveUninitialized: true
}));

// Home route — show the to-do list for this session
app.get('/', (req, res) => {
  // Initialize the todos array for a first-time visitor
  if (!req.session.todos) {
    req.session.todos = [];
  }

  // Apply theme cookie if it exists (optional challenge)
  const theme = req.cookies.theme || 'light';
  const bgColor = theme === 'dark' ? '#222' : '#fff';
  const textColor = theme === 'dark' ? '#fff' : '#000';

  const todoListHtml = req.session.todos
    .map((item, index) => `
      <li>
        ${item}
        <form action="/delete/${index}" method="post" style="display:inline">
          <button type="submit">Delete</button>
        </form>
      </li>
    `)
    .join('');

  res.send(`
    <body style="background:${bgColor}; color:${textColor}; font-family:sans-serif; padding:20px;">
      <h2>My To-Do List</h2>

      <form action="/add" method="post">
        <input type="text" name="todoItem" placeholder="New task" required/>
        <button type="submit">Add</button>
      </form>

      <ul>${todoListHtml || '<li>No tasks yet!</li>'}</ul>

      <hr/>
      <form action="/toggle-theme" method="post">
        <button type="submit">Toggle Theme (currently: ${theme})</button>
      </form>
    </body>
  `);
});

// Add a to-do item
app.post('/add', (req, res) => {
  if (!req.session.todos) {
    req.session.todos = [];
  }
  req.session.todos.push(req.body.todoItem);
  res.redirect('/');
});

// Delete a to-do item by index
app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  req.session.todos = req.session.todos.filter((item, index) => index !== id);
  res.redirect('/');
});

// Optional challenge: toggle a theme cookie (dark/light)
app.post('/toggle-theme', (req, res) => {
  const currentTheme = req.cookies.theme || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  res.cookie('theme', newTheme, { maxAge: 900000 });
  res.redirect('/');
});

app.listen(PORT, () => console.log(`To-Do app running at http://localhost:${PORT}`));