import express from "express";
import Book from '../models/bookModel.js';

const router = express.Router();

// POST Method: Add a new book
router.post("/", async (req, res) => {
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
router.get('/',async(req,res)=>{
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
router.get('/:id',async(req,res)=>{
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
router.put('/:id', async(req,res)=>{
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
router.delete('/:id', async (req, res) => {
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


export default router;