import { React, useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import BookItem from "../components/BookItem/BookItem";
import Filters from "../components/Filters/Filters";
import Header from "../components/Header/Header";
import TextField from "@mui/material/TextField";

import "./_bookSearchPage.scss";
import { useNavigate } from "react-router-dom";

function BookSearchPage() {
  const { booksDB } = useSelector((state) => state.books);
  const { rating, azSort, zaSort, newSort, oldSort } = useSelector(
    (state) => state.filters
  );
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
      <Header />
      <div className="main__container">
        <TextField
          variant="outlined"
          label="Book name"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "50%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />

        <Filters />
        <div className="books__container">
          {searchedBooks.map((item) => {
            return (
              <BookItem
                key={item.isbn}
                image={item.image}
                title={item.title}
                author={item.author}
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
