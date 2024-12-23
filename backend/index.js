import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import Book from "./models/bookModel.js"; // Importing the default export

const app = express(); // Initialize Express

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes

// Root Route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Book Review API!");
});

// POST Method: Add a new book
app.post("/reviews", async (req, res) => {
    try {
        const { title, author, rating, reviewText } = req.body;

        // Validate input
        if (!title || !author || rating === undefined || !reviewText) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Ensure rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5." });
        }

        // Create a new book
        const newBook = new Book({ title, author, rating, reviewText });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook); // Respond with the saved book, including Date Added (createdAt)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route for get all Boooks from the database
app.get('/reviews',async(req,res)=>{
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data:books
        });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Route for Get one Book from the database by id
app.get('/reviews/:id',async(req,res)=>{
    try{
        const {id} = req.params;

        const book = await Book.findById(id);
        return res.status(200).json(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Route for Update a review
app.put('/reviews/:id', async(req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.rating ||
            !req.body.reviewText
        ){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }

        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message:'Book not found'});
        }
        return res.status(200).send({message:'Book upated successfully'});
    }
        catch(error){
            console.log(error.message);
            res.status(500).send({message: error.message});
        }
    
});

// Route for delete a book
app.delete('/reviews/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Connect to MongoDB and start the server
mongoose
    .connect(mongoDBURL)  // Remove useNewUrlParser and useUnifiedTopology options
    .then(() => {
        console.log("Connected to the database");
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });
