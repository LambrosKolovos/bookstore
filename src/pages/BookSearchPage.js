import { React, useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import BookItem from "../components/BookItem/BookItem";
import Filters from "../components/Filters/Filters";
import Header from "../components/Header/Header";
import TextField from "@mui/material/TextField";

import "./_bookSearchPage.scss";

function BookSearchPage() {
  const { booksDB } = useSelector((state) => state.books);
  const { rating, azSort, zaSort, newSort, oldSort } = useSelector(
    (state) => state.filters
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      booksDB.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          book.rating >= rating
      )
    );
  }, [searchQuery, rating]);

  const applyFilters = () => {
    const tempArr = filteredData;

    if (azSort) tempArr.sort((a, b) => a.title.localeCompare(b.title));
    if (zaSort) tempArr.sort((b, a) => a.title.localeCompare(b.title));

    if (newSort)
      tempArr.sort((a, b) => new Date(b.published) - new Date(a.published));
    if (oldSort)
      tempArr.sort((a, b) => new Date(a.published) - new Date(b.published));

    if (tempArr.length) setFilteredData(tempArr);
  };

  useEffect(() => {
    applyFilters();
  }, [filteredData, azSort, zaSort, newSort, oldSort]);

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
          {filteredData.map((item) => {
            return (
              <BookItem
                key={item.isbn}
                image={item.image}
                title={item.title}
                author={item.author}
                rating={item.rating}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BookSearchPage;
