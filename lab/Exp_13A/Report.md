# Experiment 13A: Express + Mongoose User Management Tutorial

A beginner-friendly guide to learn MongoDB, Mongoose, and Express basics through a simple user registration and login system.

## Objective

To build a simple User Management System using Node.js, Express, and Mongoose that demonstrates:
- Connecting a Node.js application to a MongoDB database (via MongoDB Atlas)
- Defining schemas and models with Mongoose
- Performing CRUD-style operations (Create and Read) on user data
- Basic error handling for duplicate entries and invalid logins

## Prerequisites

- Node.js installed on your system
- A MongoDB Atlas account (cloud-hosted MongoDB, free tier)
- Basic understanding of JavaScript, including `async/await`

## Tech Stack

| Component | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for running the server |
| **Express** | Web framework to handle routes and HTTP requests |
| **Mongoose** | ODM (Object Data Modeling) library to interact with MongoDB |
| **MongoDB Atlas** | Cloud-hosted database |

## Project Setup

### 1. Create project directory
```bash
mkdir mongoose-demo
cd mongoose-demo
```

### 2. Initialize Node.js project
```bash
npm init -y
```

### 3. Install dependencies
```bash
npm install express mongoose
```

### 4. Create `server.js`
Create a file named `server.js` in the project directory with the full application code (see `server.js` in this project).

## MongoDB Atlas Setup

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free M0 cluster
3. Create a database user (username + password)
4. Allow network access (your current IP, or `0.0.0.0/0` for open access during development)
5. Get your connection string from **Connect → Drivers → Node.js**, and insert it into `server.js` as `DB_URL`

> ⚠️ Never share your real connection string or password publicly — treat it like a login credential.

## Understanding the Core Components

### Schema
Defines the structure of a document (like a form template):
```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
```

### Model
The interface used to create, read, update, and delete documents:
```javascript
const User = mongoose.model('User', userSchema);
```

### Routes
| Route | Method | Purpose |
|---|---|---|
| `/` | GET | Displays the home page with signup/login forms |
| `/signup` | POST | Registers a new user |
| `/login` | POST | Authenticates an existing user |
| `/users` | GET | Lists all registered users |

## Running the Application

1. Start the server:
```bash
node server.js
```
2. You should see:
```
Server running on http://localhost:3000
Connected to MongoDB successfully
```
3. Open your browser and navigate to:
```
http://localhost:3000
```

## Testing Checklist

- [ ] Register a new user via the signup form
- [ ] Log in using the same credentials
- [ ] View all registered users
- [ ] Try signing up with a duplicate username/email → should show an error
- [ ] Try logging in with a wrong password → should show "Incorrect password"
- [ ] Try logging in with a non-existent username → should show "User not found"

## Key Mongoose Methods Used

| Method | Purpose |
|---|---|
| `.save()` | Save a new document |
| `.find()` | Find all documents |
| `.findOne()` | Find a single document matching a condition |

## Project Structure

```
mongoose-demo/
├── node_modules/
├── server.js
├── package.json
└── package-lock.json
```

## Important Notes

- **No encryption**: Passwords are stored as plain text in this example for learning purposes. In production, always hash passwords using a library like `bcrypt`.
- **Database name**: `userdb` — created automatically by MongoDB Atlas on first write.
- **Collection name**: Mongoose automatically pluralizes and lowercases the model name, so the `User` model creates a `users` collection.

## Common Issues & Fixes

| Issue | Likely Cause | Fix |
|---|---|---|
| `bad auth: authentication failed` | Wrong password, or leftover `< >` brackets in connection string | Double-check the password and remove placeholder brackets |
| `querySrv ECONNREFUSED` | DNS cannot resolve MongoDB's SRV record (common on restrictive networks) | Switch DNS to `8.8.8.8` / `8.8.4.4`, or try a mobile hotspot |
| SSL/TLS handshake error | Node.js version incompatibility, system clock out of sync, or antivirus/VPN interference | Sync system clock, try `tls: true` option, or use Node.js LTS (v20/v22) |
| `Cannot find module 'server.js'` | Running the command from the wrong folder | `cd` into the folder containing `server.js` before running `node server.js` |

## Next Steps (Optional Enhancements)

- Add password hashing with `bcrypt`
- Implement session-based login
- Add more fields to the schema (age, address, etc.)
- Create update and delete routes
- Add input validation
- Move the database URL into a `.env` file (environment variable) instead of hardcoding it
- Separate routes into different files for better structure

## Summary

This experiment demonstrates the fundamentals of connecting a Node.js/Express application to MongoDB using Mongoose — including schema definition, model creation, saving and retrieving documents, and basic error handling — through a simple user registration and login system.