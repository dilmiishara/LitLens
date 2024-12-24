import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import StarRating from "../StarRating";

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2 text-white">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Author
          </th>
          <th className="border border-slate-600 rounded-md">Date</th>
          <th className="border border-slate-600 rounded-md">Ratings</th>
          <th className="border border-slate-600 rounded-md">Reviews</th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {book.title}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.author}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {book.createdAt}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <StarRating rating={book.rating} />
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {book.reviewText}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
