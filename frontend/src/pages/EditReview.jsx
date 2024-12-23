import React, { useState, useEffect} from 'react';
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditReview = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [ratings, setRatings] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(()=>{
        setLoading(true);
        axios.get(`http://localhost:5555/reviews/${id}`)
        .then((res)=>{
            setAuthor(res.data.author);
            setTitle(res.data.title);
            setRatings(res.data.ratings);
            setReviewText(res.data.reviewText);
            setLoading(false);
        }).catch((error)=>{
            setLoading(false);
            alert('An error happend. Please Check console');
            console.log(error);
        });
    },[])

    const handleEditBook = () => {
        // Basic validation checks
        if (!title || !author || !reviewText || ratings === '') {
            setError("All fields are required.");
            return;
        }
    
        // Ensure ratings is a number and is between 1 and 5
        if (isNaN(ratings) || ratings < 1 || ratings > 5) {
            setError("Ratings must be a number between 1 and 5.");
            return;
        }
    
        // Clear previous error message
        setError('');
    
        // Prepare the data for the API request
        const data = {
            title,
            author,
            rating: parseInt(ratings, 10),  // Correct field name to 'rating'
            reviewText
        };
    
        setLoading(true);
    
        // Send the data to the backend
        axios.put(`http://localhost:5555/reviews/${id}`, data)
            .then(response => {
                setLoading(false);
                console.log('Book created successfully:', response);
    
                // Adding a small delay before navigating
                setTimeout(() => {
                    navigate('/'); // Redirect to the reviews page after success
                }, 200);  // Adjust the delay (200ms) if needed
            })
            .catch(error => {
                setLoading(false);
                setError(error.response ? error.response.data.error : "An error occurred. Please try again.");
                console.error('Error creating book:', error.response ? error.response.data : error.message);
            });
    };
    

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Edit Review</h1>
            {loading && <Spinner />} {/* Show spinner when loading */}
            
            {/* Display validation error if any */}
            {error && <div className="text-red-500 my-2">{error}</div>}
            
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full" 
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input 
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full" 
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Ratings</label>
                    <input 
                        type="number"
                        value={ratings}
                        onChange={(e) => setRatings(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full" 
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Review</label>
                    <input 
                        type="text"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full" 
                    />
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditReview;