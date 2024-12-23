import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import Book from "./models/bookModel.js"; // Importing the default export
import booksRoute from './routes/reviewRoute.js';
import cors from 'cors';

const app = express(); // Initialize Express

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors());
app.use(
    cors({
        origin:'http://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

// Root Route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Book Review API!");
});

app.use('/reviews', booksRoute);

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
