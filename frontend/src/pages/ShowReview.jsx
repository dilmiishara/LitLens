import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import bgImage from "../assets/bg.jpg"; // Importing the background image

const ShowReview = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/reviews/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div
      className="p-4 min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`, // Using the imported background image
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 blur-md"></div> {/* Blurred overlay */}

      <div className="relative z-10">
        <BackButton />
        <h1 className="text-3xl my-4 text-white">Show Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-white rounded-xl w-fit p-4 bg-white bg-opacity-70">
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Id</span>
              <span>{book._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Title</span>
              <span>{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Author</span>
              <span>{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Create date</span>
              <span>{book.createdAt}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Ratings</span>
              <span>{book.rating}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Review Text</span>
              <span>{book.reviewText}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Create Time</span>
              <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowReview;
