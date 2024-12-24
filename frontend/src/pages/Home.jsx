import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Fetch data
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/reviews")
      .then((res) => {
        setBooks(res.data.data);
        setFilteredBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Handle Filtering
  const handleFilter = () => {
    const filtered = books
      .filter((book) => 
        ratingFilter ? book.rating >= Number(ratingFilter) : true
      )
      .sort((a, b) => b.rating - a.rating); // Sort by ratings in descending order
    setFilteredBooks(filtered);
  };

  // Handle Sorting
  const handleSort = () => {
    const sorted = [...filteredBooks].sort((a, b) => {
      if (sortOption === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortOption === "desc") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
    setFilteredBooks(sorted);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h1 className="text-3xl">Book List</h1>
        <Link to="/reviews/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      <div className="flex justify-between items-center my-4">
        <div>
          <label className="mr-2">Filter by Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="border-2 border-gray-500 px-2 py-1"
          />
          <button
            onClick={handleFilter}
            className="ml-2 bg-green-500 text-white px-4 py-1 rounded"
          >
            Filter
          </button>
        </div>
        <div>
          <label className="mr-2">Sort by Date:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border-2 border-gray-500 px-2 py-1"
          >
            <option value="">Select</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button
            onClick={handleSort}
            className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            Sort
          </button>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={filteredBooks} />
      ) : (
        <BooksCard books={filteredBooks} />
      )}
    </div>
  );
};

export default Home;
