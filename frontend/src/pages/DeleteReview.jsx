import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import bgImage from "../assets/bg.jpg"; // Importing the image

const DeleteReview = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/reviews/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div
      className="p-4 min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`, // Use the imported image here
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 blur-md"></div> {/* Adding the blurred overlay */}

      <div className="relative z-10">
        <BackButton />
        <h1 className="text-3xl my-4 text-white">Delete Book</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center border-2 border-white rounded-xl w-[600px] p-8 mx-auto bg-white bg-opacity-70">
          <h3 className="text-2xl text-gray-800">Are you sure you want to delete this book?</h3>
          <button
            className="p-4 bg-black text-white m-8 w-full"
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReview;
