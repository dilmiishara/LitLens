import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true, // Rating should be between 1 and 5
        },
        reviewText: {
            type: String,
            required: true, // Add review text field (string)
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` (Date Added) and `updatedAt` fields
    }
);

// Default export for the Book model
const Book = mongoose.model("Book", bookSchema);
export default Book;
