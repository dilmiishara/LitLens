import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModel = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-6 flex flex-col relative"
      >
        {/* Close Button */}
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        {/* Book Details */}
        <h4 className="text-gray-500 mb-4">ID: {book._id}</h4>
        <div className="flex items-center gap-x-2 mb-4">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="text-xl font-semibold">{book.title}</h2>
        </div>
        <div className="flex items-center gap-x-2 mb-4">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="text-lg">{book.author}</h2>
        </div>
        <div className="mb-4">
          <h4 className="text-gray-500">
            Rating: <span className="text-black font-medium">{book.rating}</span>
          </h4>
        </div>
        <div>
          <h4 className="text-gray-500">
            Review: <span className="text-black">{book.reviewText}</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BookModel;
