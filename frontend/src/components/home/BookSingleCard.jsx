import { BookOnlineOutlined } from "@mui/icons-material";
import React from "react";
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md'; // Added missing import
import { useState } from "react";
import BookModel from "./BookModel";

const BookSingleCard = ({ book }) => {
    const [showModal,setShowModal]= useState(false);
  return (
    <div
      key={BookOnlineOutlined._id}
      className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
    >
      {/* <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
      {item._id}
    </h2> */}
      <h4 className="my-2 text-gray-500">{book._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className="text-red-300 text-2xl" />
        <h2 className="my-1">{book.title}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-red-300 text-2xl" />
        <h2 className="my-1">{book.author}</h2>
      </div>
      <div>
        <h4 className="my-2 text-gray-500">{book.rating}</h4>
      </div>
      <div>
        <h4 className="my-2 text-gray-500">{book.reviewText}</h4>
      </div>
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
        className="text-3xl text-blue-800 hover:text-black cursor-pointer"
        onClick={()=> setShowModal(true)}/>
        <Link to={`/reviews/details/${book._id}`}>
          <BsInfoCircle className="text-2xl text-green-800" />
        </Link>
        <Link to={`/reviews/edit/${book._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600" />
        </Link>
        <Link to={`/reviews/delete/${book._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600" />
        </Link>
      </div>
      {showModal && (
            <BookModel book={book} onClose={()=> setShowModal(false)}/>
        )}
    </div>
  );
};

export default BookSingleCard;
