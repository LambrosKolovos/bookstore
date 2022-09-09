import { React, useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import BookItem from "../components/BookItem/BookItem";
import Filters from "../components/Filters/Filters";
import Header from "../components/Header/Header";
import noResults from "../assets/noresults.png";
import peopleReading from "../assets/people-reading.png";
import searchlogo from "../assets/searchlogo.png";

import "./_bookSearchPage.scss";
import { useLocation, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookSearchPage() {
  const { booksDB } = useSelector((state) => state.books);
  const { rating, azSort, zaSort, newSort, oldSort, favorite } = useSelector(
    (state) => state.filters
  );
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const { bookAdded } = state || false;

  useEffect(() => {
    if (bookAdded) {
      var booksToStore = JSON.parse(localStorage.getItem("booksStored")) || [];
      booksToStore = [...booksToStore, booksDB[booksDB.length - 1]];
      localStorage.setItem("booksStored", JSON.stringify(booksToStore));

      toast.success("Book successfully added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [bookAdded, booksDB]);

  const filteredBooks = useMemo(() => {
    var tempArr = [...booksDB];
    if (localStorage.getItem("booksStored") !== null) {
      JSON.parse(localStorage.getItem("booksStored")).map((item) => {
        return (tempArr = [...tempArr, item]);
      });
    }

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
    const favBooks = JSON.parse(localStorage.getItem("favorites")) || [];

    const results = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        book.rating >= rating
    );

    if (favorite) {
      return results.filter((book) => favBooks.includes(book.isbn));
    } else return results;
  }, [filteredBooks, searchQuery, rating, favorite]);

  const viewBook = (book) => {
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
      <div className="upper__container">
        <div className="upper__left">
          <h2>
            A room without books is like
            <br /> a body without a soul.
          </h2>
        </div>
        <div className="upper__right">
          <img src={searchlogo} />
          <div className="upper__right-search">
            <input
              placeholder="Search for books..."
              className="books__search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <img src={peopleReading} alt="people-reading" />
        </div>
      </div>
      <div className="results__container">
        <Filters />
        {searchedBooks.length > 0 ? (
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
        ) : (
          <div className="noresult__container">
            <img src={noResults} width="400px" />
            <div style={{ textAlign: "center" }}> No books found!</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookSearchPage;
