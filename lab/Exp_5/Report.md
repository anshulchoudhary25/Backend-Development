# Experiment 5: JavaScript Arrays, Objects and Functions

A beginner-friendly guide to JavaScript arrays, objects and functions, run both in the browser console and in Node.js, with a small library book manager as the PBL activity.

## Objective

To write JavaScript programs that demonstrate:

- Creating and manipulating **arrays** (add, read, update)
- Defining and accessing properties of **objects** (add, read, update)
- Writing and calling **functions** to modularize code
- Using built-in **string methods** (`toUpperCase()`, `toLowerCase()`, `split()`)
- Running the same script in a **browser** and in **Node.js**

**Course Outcome:** CO2 – Create and build web pages and applications.

## Prerequisites

- Node.js installed on your system
- A web browser (Chrome) and VS Code
- Basic understanding of variables and `console.log()`

## Tech Stack

| Component | Purpose |
|---|---|
| JavaScript | Programming language used for all scripts |
| Node.js | Runs JavaScript in the terminal |
| HTML | Loads `script.js` in the browser |
| Browser Console | Shows the output of the script in the browser |

## Project Setup

### 1. Create project directory

```powershell
mkdir Exp_5
cd Exp_5
```

### 2. Create the files

```powershell
New-Item script.js, script2.js, index.html, pbl.js, Report.md
```

No `npm install` is needed, because this experiment uses only core JavaScript.

## Understanding the Core Components

### Arrays

Store multiple values in a single variable:

```js
const fruits = ['Apple', 'Banana', 'Mango'];
fruits.push('Orange');
```

### Objects

Store related data as key-value pairs:

```js
const student = {
  name: 'John Doe',
  age: 20,
  course: 'Backend Development'
};
console.log(student.name);
```

### Functions

Reusable blocks of code that perform a task:

```js
function greet(name) {
  return `Hello, ${name}! Welcome to Backend Development Lab.`;
}
```

## Files in this Experiment

| File | Purpose |
|---|---|
| `script.js` | Basic demonstration of arrays, objects and functions |
| `script2.js` | String, array and object methods (add, read, update) |
| `index.html` | Runs `script.js` in the browser |
| `pbl.js` | PBL activity: library book manager (`addBook`, `findBook`) |

## Running the Application

### Task 1 and 2: Run in Node.js

```powershell
node script.js
node script2.js
```

### Task 3: Run in the browser

1. Open `index.html` in Chrome (or with Live Server in VS Code)
2. Press **F12** and open the **Console** tab
3. Refresh the page (Ctrl + R) if the console is empty

### PBL Activity

```powershell
node pbl.js
```

## Output

### Browser console (`index.html`)

![Browser console output](./screenshots/browser-console.png)

### `node script.js`

```
--- Array Demonstration ---
Fruits array: [ 'Apple', 'Banana', 'Mango' ]
After push: [ 'Apple', 'Banana', 'Mango', 'Orange' ]

--- Object Demonstration ---
Student object: { name: 'John Doe', age: 20, course: 'Backend Development' }
Student Name: John Doe

--- Function Demonstration ---
Hello, Student! Welcome to Backend Development Lab.
```

![script.js output](./screenshots/script.png)

### `node script2.js`

```
--- String Methods ---
Original: Backend Development
Upper Case: BACKEND DEVELOPMENT
Lower Case: backend development
Split by space: [ 'Backend', 'Development' ]

--- Array Methods ---
After Adding: [ 'Node', 'Express', 'MongoDB' ]
First Item (Read): Node
After Updating: [ 'Node.js', 'Express', 'MongoDB' ]

--- Object Methods ---
After Adding Key: { name: 'John', role: 'Dev', age: 25 }
User Name (Read): John
After Updating Role: { name: 'John', role: 'Senior Dev', age: 25 }
```

![script2.js output](./screenshots/script2.png)

### `node pbl.js`

```
Added: "The Alchemist" by Paulo Coelho
Added: "Clean Code" by Robert C. Martin
Added: "Atomic Habits" by James Clear

Library: [
  { title: 'The Alchemist', author: 'Paulo Coelho' },
  { title: 'Clean Code', author: 'Robert C. Martin' },
  { title: 'Atomic Habits', author: 'James Clear' }
]

Searching for 'Clean Code':
{ title: 'Clean Code', author: 'Robert C. Martin' }

Searching for 'Harry Potter':
Book not found
```

![pbl.js output](./screenshots/pbl.png)

## PBL Activity: Library Book Manager

**Problem:** Manage a list of library books where each book is an object.

```js
const library = [];

function addBook(title, author) {
  library.push({ title: title, author: author });
  console.log(`Added: "${title}" by ${author}`);
}

function findBook(title) {
  return library.find(book => book.title.toLowerCase() === title.toLowerCase());
}
```

- `library` is an array that stores book objects.
- `addBook()` creates a book object and adds it with `push()`.
- `findBook()` searches the array with `find()`, ignoring upper and lower case.
- `findBook()` returns `undefined` when no book matches, which is why the test prints "Book not found".

## Testing Checklist

- [x] `script.js` prints the array, object and greeting output
- [x] `script2.js` shows string, array and object methods
- [x] `index.html` shows the same output as `script.js` in the browser console
- [x] `addBook()` adds three books to the library
- [x] `findBook("Clean Code")` returns the correct book
- [x] `findBook("Harry Potter")` prints "Book not found"

## Key Methods Used

| Method | Purpose |
|---|---|
| `push()` | Add an element to the end of an array |
| `find()` | Return the first array element matching a condition |
| `toUpperCase()` | Convert a string to uppercase |
| `toLowerCase()` | Convert a string to lowercase |
| `split()` | Split a string into an array using a delimiter |
| `console.log()` | Print output to the console or terminal |

## Project Structure

```
Exp_5/
├── screenshots/
├── index.html
├── pbl.js
├── Report.md
├── script.js
└── script2.js
```

## Important Notes

- **In-memory data:** the `library` array lives only while the program runs. Data is lost when the script ends. A database (like MongoDB) is used for permanent storage in later experiments.
- **`const` with arrays and objects:** `const` stops the variable from being reassigned, but you can still change what is inside the array or object.
- **Browser vs Node.js:** the same JavaScript runs in both, but the output appears in the browser console or the terminal respectively.

## Common Issues & Fixes

| Issue | Likely Cause | Fix |
|---|---|---|
| `node is not recognized` | Node.js not installed or not in PATH | Install Node.js LTS and restart the terminal |
| `Cannot find module 'script.js'` | Running the command from the wrong folder | `cd` into `Exp_5` before running `node script.js` |
| Browser console is empty | Console opened after the page loaded | Refresh the page with Ctrl + R |
| `script.js` not loading in browser | Wrong file name or path in the `<script>` tag | Make sure `index.html` and `script.js` are in the same folder |

## Next Steps (Optional Enhancements)

- Add `removeBook(title)` and `updateBook(title, newAuthor)` functions
- Use `filter()` to search books by author
- Use `map()` and `forEach()` to display all book titles
- Show the library on the web page instead of only in the console

## Summary

This experiment demonstrates the fundamentals of JavaScript data handling: arrays manage ordered lists, objects store structured data as key-value pairs, and functions encapsulate logic for reuse. These were applied in a library book manager that adds and searches books in memory, run both in the browser console and in Node.js.