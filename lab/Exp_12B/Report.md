# Experiment 12B (Optional) — State Management using Sessions & Cookies

## Objective
To understand HTTP statelessness and demonstrate two common solutions for maintaining
user state in a Node.js/Express backend — **Cookies** and **Sessions** — and to apply
these concepts by building a login system and a session-based to-do list.

## Concepts Covered
- **HTTP is stateless** — each request is independent; the server does not remember
  a client between requests unless we explicitly implement state management.
- **Cookies** — small pieces of data stored in the *browser*, sent back to the server
  with every request. Good for non-sensitive data (e.g., theme preference).
- **Sessions** — server-side storage of user data, with only a session ID (inside a
  cookie) held by the client. Safer for sensitive data since the real data never
  leaves the server.

## Tools & Packages Used
| Package | Purpose |
|---|---|
| `express` | Web server framework |
| `express-session` | Middleware for creating/managing sessions |
| `cookie-parser` | Middleware for reading cookies from requests |

Installed via:
```bash
npm init -y
npm install express express-session cookie-parser
```

## File Structure
```
Exp_12B/
├── node_modules/
├── Source/
│   ├── session-example.js     # Part 1: basic session demo (visit counter)
│   └── cookie-example.js      # Part 2: basic cookie demo (set/get/delete)
├── server.js                  # Combined login/logout demo (sessions + cookies)
├── login-system.js            # Lab Exercise 1: Simple User Login System
├── todo-app.js                # Lab Exercise 2: Session-based To-Do List
├── package.json
├── package-lock.json
└── README.md
```

## How to Run Each File

Each file listens on a different port so they don't conflict:

| File | Command | URL | Port |
|---|---|---|---|
| `Source/session-example.js` | `node Source/session-example.js` | http://localhost:3000 | 3000 |
| `Source/cookie-example.js` | `node Source/cookie-example.js` | http://localhost:3000 | 3000 |
| `server.js` | `node server.js` | http://localhost:3000 | 3000 |
| `login-system.js` | `node login-system.js` | http://localhost:3001 | 3001 |
| `todo-app.js` | `node todo-app.js` | http://localhost:3002 | 3002 |

> Note: `session-example.js`, `cookie-example.js`, and `server.js` all use port 3000,
> so only one of them should be run at a time (stop with `Ctrl + C` before starting
> the next).

---

## Part 1 — Session Demo (`session-example.js`)
Tracks how many times a visitor has loaded the page, using `req.session.views`.
- `/` — increments and displays the visit count for the current session.
- `/destroy` — destroys the session, resetting the counter.

## Part 2 — Cookie Demo (`cookie-example.js`)
Demonstrates setting, reading, and deleting a browser cookie directly.
- `/set-cookie` — sets a cookie `username=JohnDoe`.
- `/get-cookie` — reads and displays the `username` cookie.
- `/delete-cookie` — clears the `username` cookie.

## Combined Demo (`server.js`)
A minimal login/logout flow combining both sessions and cookies:
- `/` — shows a login form, or a welcome message if already logged in.
- `POST /login` — stores the entered username in `req.session.username`, and also
  sets a sample `theme` cookie (`httpOnly`).
- `/logout` — destroys the session and clears the session cookie.

---

## Lab Exercise 1 — Simple User Login System (`login-system.js`)
A minimal registration + login system using an in-memory array as a fake database.

- `GET /register`, `POST /register` — register a new username/password.
- `GET /login`, `POST /login` — authenticate against stored users; on success,
  `req.session.user = { username }`.
- `GET /dashboard` — protected route, only accessible if `req.session.user` exists
  (enforced via a custom `authMiddleware`).
- `GET /logout` — destroys the session.

**Key learning:** how to protect routes using session-based middleware, so that
only authenticated users can access certain pages.

> ⚠️ Passwords are stored in plain text here for simplicity — this is fine for a
> lab exercise only. In production, passwords must be hashed (e.g., with `bcrypt`)
> before storing.

## Lab Exercise 2 — Session-Based To-Do List (`todo-app.js`)
A to-do list where each user's items are stored in `req.session.todos`, so
different browsers/sessions maintain independent lists.

- `/` — displays the current session's to-do list (initializes `req.session.todos`
  as an empty array on first visit).
- `POST /add` — pushes a new item into `req.session.todos`.
- `POST /delete/:id` — removes an item by index using `.filter()`.
- `POST /toggle-theme` *(optional challenge)* — sets a `theme` cookie (light/dark)
  independent of the session data, demonstrating cookies and sessions being used
  together for different purposes.

**Key learning:** storing per-user application data (todos) in sessions, while
using a plain cookie for a simple, persistent UI preference.

---

## Testing Performed
- Verified visit counter increments correctly across refreshes and resets after
  `/destroy` (session demo).
- Verified cookie set → get → delete flow, and inspected the `username` cookie in
  browser DevTools (cookie demo).
- Verified login → welcome message → logout flow, and confirmed the `theme` cookie
  is `httpOnly` (not visible via `document.cookie` in the console) (`server.js`).
- Verified register → login → dashboard access, and confirmed an incognito window
  is redirected away from `/dashboard` when not logged in (`login-system.js`).
- Verified add/delete of to-do items, theme toggling persisting across page loads,
  and confirmed an incognito window has a completely separate, empty to-do list
  (`todo-app.js`).

## When to Use What
| Use Case | Recommended |
|---|---|
| Remembering a theme or language | Cookie |
| Keeping a user logged in | Session |
| Storing shopping cart / to-do items | Session |

## Learning Outcomes
- Understood why HTTP is stateless and why state management is needed.
- Learned how to set, read, and destroy cookies using `cookie-parser`.
- Learned how to create, use, and destroy sessions using `express-session`.
- Implemented route protection using custom authentication middleware.
- Implemented per-user server-side data storage (to-do list) using sessions.
- Understood the difference between client-side (cookie) and server-side
  (session) state, and when to use each.

## Next Steps (Not Implemented — Future Improvements)
- Add real authentication with `passport.js`.
- Hash passwords using `bcrypt` before storing.
- Use a persistent session store (e.g., Redis or MongoDB) instead of in-memory.
- Move secrets (e.g., session secret) into environment variables using `dotenv`.
- Deploy over HTTPS with `secure: true` cookies.