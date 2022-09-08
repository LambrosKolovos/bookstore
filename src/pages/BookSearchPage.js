import { React, useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import BookItem from "../components/BookItem/BookItem";
import Filters from "../components/Filters/Filters";
import Header from "../components/Header/Header";
import TextField from "@mui/material/TextField";

import "./_bookSearchPage.scss";
import { useLocation, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookSearchPage() {
  const { booksDB } = useSelector((state) => state.books);
  const { rating, azSort, zaSort, newSort, oldSort } = useSelector(
    (state) => state.filters
  );
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const { bookAdded } = state || false;

  useEffect(() => {
    if (bookAdded)
      toast.success("Book successfully added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  }, [bookAdded]);

  const filteredBooks = useMemo(() => {
    const tempArr = [...booksDB];
    if (azSort) return tempArr.sort((a, b) => a.title.localeCompare(b.title));
    if (zaSort) return tempArr.sort((b, a) => a.title.localeCompare(b.title));
    if (newSort)
      return tempArr.sort(
        (a, b) => new Date(b.published) - new Date(a.published)
      );
    if (oldSort)
      return tempArr.sort(
        (a, b) => new Date(a.published) - new Date(b.published)
      );

    return tempArr;
  }, [booksDB, azSort, zaSort, newSort, oldSort]);

  const searchedBooks = useMemo(() => {
    return filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        book.rating >= rating
    );
  }, [filteredBooks, searchQuery, rating]);

  const viewBook = (book) => {
    console.log(book.isbn);
    navigate("../view/" + book.isbn, {
      replace: true,
      state: {
        bookToDisplay: book,
      },
    });
  };

  return (
    <div>
      {bookAdded && <ToastContainer />}
      <Header />
      <div className="main__container">
        <input
          placeholder="Search for books..."
          className="books__search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Filters />
        <div className="books__container">
          {searchedBooks.map((item) => {
            return (
              <BookItem
                key={item.isbn}
                image={item.image}
                title={item.title}
                author={
                  Array.isArray(item.author)
                    ? item.author.join(", ")
                    : item.author
                }
                rating={item.rating}
                onClick={() => viewBook(item)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BookSearchPage;
