const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

// MongoDB
const mongoURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoURL);

let notesCollection;

// EJS
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect MongoDB
async function connectDB() {
    await client.connect();

    const database = client.db("notes_lab");
    notesCollection = database.collection("notes");

    console.log("Connected to MongoDB");
}

// Home - Display all notes
app.get("/", async (req, res) => {
    try {
        const notes = await notesCollection
            .find()
            .sort({ createdAt: -1 })
            .toArray();

        res.render("index", { notes });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading notes");
    }
});

// Add note page
app.get("/notes/new", (req, res) => {
    res.render("new");
});

// Add note
app.post("/notes", async (req, res) => {
    try {
        const { title, content, category } = req.body;

        // Validation: title and content cannot be empty
        if (!title || !title.trim() || !content || !content.trim()) {
            return res.status(400).send("Title and content are required.");
        }

        // Validation: title must contain at least one letter
        if (!/[a-zA-Z]/.test(title)) {
            return res.status(400).send("Title must contain letters.");
        }

        // Insert note into MongoDB
        await notesCollection.insertOne({
            title: title.trim(),
            content: content.trim(),
            category: category ? category.trim() : "",
            createdAt: new Date()
        });

        // Redirect to home page
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding note");
    }
});

// Delete note
app.post("/notes/:id/delete", async (req, res) => {
    try {
        await notesCollection.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting note");
    }
});

/// Start server after MongoDB connection
connectDB()
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on http://10.120.97.179:3000`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });