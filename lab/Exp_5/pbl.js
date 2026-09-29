// Array to store book objects
const library = [];

// Add a book
function addBook(title, author) {
    library.push({ title: title, author: author });
    console.log(`Added: "${title}" by ${author}`);
}

// Find a book by title
function findBook(title) {
    return library.find(book => book.title.toLowerCase() === title.toLowerCase());
}

// Testing
addBook("The Alchemist", "Paulo Coelho");
addBook("Clean Code", "Robert C. Martin");
addBook("Atomic Habits", "James Clear");

console.log("\nLibrary:", library);

console.log("\nSearching for 'Clean Code':");
console.log(findBook("Clean Code"));

console.log("\nSearching for 'Harry Potter':");
const result = findBook("Harry Potter");
console.log(result ? result : "Book not found");