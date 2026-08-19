# Experiment 12: Node.js, Express.js, and EJS Templating

## Course Outcome
**CO2:** Create and build web pages and applications.

## Objective
To understand and implement server-side JavaScript using Node.js, build RESTful APIs with Express.js, handle HTTP requests and responses, work with URL parameters and POST data, implement EJS templating, and use development tools like Nodemon.

## Requirements / Tools
* Visual Studio Code
* Node.js and NPM
* Web Browser
* Windows PowerShell (integrated VS Code terminal)
* Express.js
* EJS (Embedded JavaScript templating engine)
* Nodemon

## Theory

**Node.js** is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run on the server side. It is asynchronous, event-driven, single-threaded (with an event loop), and has a large package ecosystem via NPM.

**NPM (Node Package Manager)** is used to install and manage third-party libraries, share code, manage dependencies, and run project scripts.

**Express.js** is a minimal and flexible Node.js web framework used to build web servers and APIs. It supports routing, middleware, template engine integration, and various HTTP utility methods (`res.send()`, `res.json()`, `res.render()`, `res.sendFile()`, `res.status()`, `res.redirect()`).

**EJS (Embedded JavaScript)** is a templating engine that generates HTML markup using plain JavaScript, allowing dynamic content to be embedded in HTML pages.

**Nodemon** is a development tool that automatically restarts a Node.js application whenever file changes are detected, removing the need for manual server restarts during development.

## Procedure

### Part A: Node.js and Express Basics
1. Installed Node.js and NPM, and verified the installation using `node --version` and `npm --version`.
2. Created a project directory (`nodejs-express-lab`) and initialized it using `npm init -y`, generating `package.json`.
3. Wrote a basic Node.js script (`script.js`) and executed it using `node script.js` to confirm the Node.js runtime works independently of any framework.
4. Installed Express.js using `npm install express`.
5. Created a basic Express server (`app.js`) with a root route (`/`) returning "Welcome to Express!" and started it using `node app.js`.
6. Verified the server in the browser at `http://localhost:3000`.
7. Implemented multiple Express response methods:
   * `/text` — plain text response using `res.send()`
   * `/html` — raw HTML response using `res.send()`
   * `/json` — structured JSON response using `res.json()`
   * `/status` — custom HTTP status code (201) using `res.status().json()`

### Part B: URL Parameters and POST Data
8. Implemented route parameters accessed via `req.params`:
   * `/user/:id`
   * `/product/:category/:id`
9. Implemented query parameters accessed via `req.query`:
   * `/search` — returns search term, page, and limit (with default values using `||`)
   * `/calculate` — a calculator supporting add, subtract, multiply, and divide operations, with `parseFloat()` used to convert string query values into numbers before performing arithmetic
10. Enabled body-parsing middleware:
    ```js
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    ```
    Implemented POST routes:
    * `/register` — accepts `username`, `email`, `password` via `req.body` and returns a confirmation
    * `/login` — validates credentials and returns a success response with a token, or a `401 Unauthorized` response with `success: false` for invalid credentials

**Testing note:** Since POST requests cannot be triggered by simply visiting a URL in the browser, they were tested from the integrated terminal. Windows PowerShell aliases `curl` to `Invoke-WebRequest`, which uses different flag syntax and does not handle single-quoted JSON bodies the same way as true curl. After troubleshooting quoting issues with both `curl.exe` and PowerShell's own parser, the POST routes were successfully tested using PowerShell's native `Invoke-RestMethod` cmdlet, e.g.:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/register" -Method Post -ContentType "application/json" -Body '{"username":"john","email":"john@example.com","password":"pass123"}'
```

### Part C: EJS Templating
11. Installed EJS using `npm install ejs` and configured the view engine:
    ```js
    app.set('view engine', 'ejs');
    app.set('views', './views');
    ```
12. Created a `views` folder containing three EJS templates:
    * `home.ejs` — displays a dynamic heading, message, and current server time using `<%= %>`
    * `users.ejs` — loops through an array of user objects with `<% users.forEach(...) %>` and renders them as rows in an HTML table
    * `profile.ejs` — displays a single user's profile details (name, email, age, city) in a styled card
13. Added corresponding Express routes that render these templates using `res.render()` with dynamic data passed as the second argument:
    * `GET /home`
    * `GET /users`
    * `GET /profile/:id`

### Part D: Nodemon for Auto-Restart
14. Installed Nodemon locally as a dev dependency:
    ```
    npm install nodemon -D
    ```
15. Updated the `dev` script in `package.json`:
    ```json
    "scripts": {
      "start": "node app.js",
      "dev": "nodemon app.js"
    }
    ```
16. Ran the server using `npm run dev`, then modified a message string inside `app.js` while the server was running. Nodemon automatically detected the file change and restarted the server without any manual intervention, and the updated content was immediately visible on refreshing the browser.

## Implementation
The complete server logic was implemented in `app.js`, covering all routes from Parts A–D: plain text, HTML, and JSON responses; route and query parameter handling; POST body handling with validation; and EJS template rendering. The dynamic views were implemented in the `views/` folder (`home.ejs`, `users.ejs`, `profile.ejs`). Project configuration and dependencies (`express`, `ejs`, `nodemon`) were managed through `package.json`.

**Project structure:**
```
nodejs-express-lab/
│
├── app.js
├── script.js
├── package.json
├── package-lock.json
├── node_modules/
└── views/
    ├── home.ejs
    ├── users.ejs
    └── profile.ejs
```

## Result
An Express.js server was successfully built and run on `http://localhost:3000`, exposing multiple GET and POST endpoints. Route parameters, query parameters, and POST body data were all handled and tested successfully — including a working calculator API and a registration/login flow with both success and failure (401) responses. EJS templates rendered dynamic HTML content correctly for the home page, the users list table, and the individual user profile page. Nodemon was configured and verified to automatically restart the server on file changes during development, streamlining the development workflow.

All routes were tested and confirmed working:

| Route | Method | Purpose | Status |
|---|---|---|---|
| `/` | GET | Welcome message 
| `/text` | GET | Plain text response 
| `/html` | GET | HTML response 
| `/json` | GET | JSON response 
| `/status` | GET | Custom status code (201) 
| `/user/:id` | GET | Route parameter 
| `/product/:category/:id` | GET | Multiple route parameters 
| `/search` | GET | Query parameters with defaults 
| `/calculate` | GET | Query parameters + arithmetic 
| `/register` | POST | Body data handling 
| `/login` | POST | Validation + 401 handling 
| `/home` | GET | EJS dynamic rendering 
| `/users` | GET | EJS loop/table rendering 
| `/profile/:id` | GET | EJS rendering + route param 

## Conclusion
This experiment provided hands-on understanding of backend development using Node.js and Express.js. It covered setting up a server, handling different types of HTTP requests and responses, working with URL and query parameters, processing POST data, rendering dynamic pages with EJS templating, and using Nodemon to streamline the development workflow. It also provided practical exposure to platform-specific tooling differences, such as how Windows PowerShell handles `curl` and JSON quoting differently from Unix-based shells. These concepts form the foundation of backend web application development in the Node.js ecosystem.