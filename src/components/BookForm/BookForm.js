import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import placeholder from "../../assets/placeholder.png";
import { Rating } from "@mui/material";

import "./_bookform.scss";
import AuthorField from "./AuthorField";
import { useDispatch } from "react-redux";
import { insertBook } from "../../redux/bookSlice";

import { useNavigate } from "react-router-dom";

function BookForm() {
  const [bookToAdd, setBookToAdd] = useState({
    isbn: "",
    title: "",
    subtitle: "",
    author: [""],
    published: "",
    publisher: "",
    pages: 0,
    description: "",
    website: "",
    image: placeholder,
    rating: 1,
  });
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setBookToAdd((currentBook) => ({
      ...currentBook,
      author: bookToAdd.author.filter((name) => name !== " "),
    }));

    if (formIsValid()) {
      dispatch(insertBook(bookToAdd));

      navigate("../search", {
        state: {
          bookAdded: true,
        },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookToAdd((currentBook) => ({
      ...currentBook,
      [name]: value,
    }));
  };

  const handleAuthorChange = (e, idx) => {
    const tempArr = bookToAdd.author;
    tempArr[idx] = e.target.value;
    setBookToAdd((currentBook) => ({
      ...currentBook,
      author: tempArr,
    }));
  };

  const addAuthorField = (e) => {
    e.preventDefault();

    setBookToAdd((currentBook) => ({
      ...currentBook,
      author: [...bookToAdd.author, ""],
    }));
  };

  const removeAuthorField = (idx) => {
    const tempAuthors = [...bookToAdd.author];
    tempAuthors.splice(idx, 1);
    setBookToAdd((currentBook) => ({
      ...currentBook,
      author: tempAuthors,
    }));
  };

  const formIsValid = () => {
    let tempError = {};
    if (bookToAdd.title.length < 10 || bookToAdd.title.length > 120) {
      tempError.title = "Title should be 10-120 characters long!";
    }

    if (bookToAdd.description.length > 512) {
      tempError.description = "Description can be 512 characters long!";
    }

    if (
      bookToAdd.description.charAt(0) !==
      bookToAdd.description.charAt(0).toUpperCase()
    ) {
      tempError.description = "Description must start with uppercase letter!";
    }

    if (bookToAdd.publisher.length < 5 || bookToAdd.length > 60) {
      tempError.publisher = "Publisher name should be 5-60 characters long!";
    }

    if (bookToAdd.pages > 999 || bookToAdd.pages < 0) {
      tempError.pages = "Pages value can be 0-999!";
    }

    if (isNaN(bookToAdd.isbn)) {
      tempError.isbn = "Please provide a valid number!";
    }

    if (bookToAdd.isbn.length > 10) {
      tempError.isbn = "ISBN can be 10 number max!";
    }

    setError(tempError);
    return Object.keys(tempError).length === 0;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bookform__container">
        <div className="bookform__leftcol">
          <div className="bookform__sectionheader">Basic information</div>
          <TextField
            required
            variant="filled"
            label="Book title"
            placeholder="Book title"
            name="title"
            onChange={handleChange}
          />
          {error.title && <p className="bookform__error">{error.title}</p>}
          <TextField
            variant="filled"
            label="Subtitle"
            placeholder="Book subtitle"
            name="subtitle"
            onChange={handleChange}
          />
          <TextField
            required
            multiline
            rows={8}
            variant="filled"
            label="Description"
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />
          {error.description && (
            <p className="bookform__error">{error.description}</p>
          )}
          <div className="bookform__sectionheader">Extra information</div>
          <TextField
            required
            variant="filled"
            label="Publisher"
            placeholder="Publisher name"
            onChange={handleChange}
            name="publisher"
          />
          {error.publisher && (
            <p className="bookform__error">{error.publisher}</p>
          )}
          <TextField
            variant="filled"
            label="Website"
            placeholder="Website"
            onChange={handleChange}
            name="website"
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <TextField
                required
                variant="filled"
                label="Number of pages"
                type="number"
                placeholder="Pages"
                onChange={handleChange}
                name="pages"
              />
              {error.description && (
                <p className="bookform__error">{error.pages}</p>
              )}
            </div>
            <TextField
              required
              variant="filled"
              label="Year"
              type="date"
              onChange={handleChange}
              name="published"
            />
          </div>
          <TextField
            required
            variant="filled"
            label="ISBN"
            placeholder="ISBN"
            onChange={handleChange}
            name="isbn"
          />
          {error.isbn && <p className="bookform__error">{error.isbn}</p>}
        </div>
        <div className="bookform__rightcol">
          <img
            src={placeholder}
            alt="book-cover"
            height="400px"
            width="225px"
          />
          <AuthorField
            text={bookToAdd.author[0] !== "" ? bookToAdd.author[0] : " "}
            showRemove={false}
            authorChangeValue={(e) => handleAuthorChange(e, 0)}
            removeAuthorField={() => removeAuthorField(0)}
          />

          {bookToAdd.author.map((item, index) => {
            return (
              index >= 1 && (
                <AuthorField
                  text={
                    bookToAdd.author[index] !== ""
                      ? bookToAdd.author[index]
                      : " "
                  }
                  showRemove={true}
                  authorChangeValue={(e) => handleAuthorChange(e, index)}
                  removeAuthorField={() => removeAuthorField(index)}
                />
              )
            );
          })}

          {bookToAdd.author.length <= 2 && (
            <button onClick={addAuthorField}>Add author</button>
          )}
          <label>Rating</label>
          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            value={bookToAdd.rating}
            onChange={(event, newVal) => {
              setBookToAdd((currentBook) => ({
                ...currentBook,
                rating: newVal,
              }));
            }}
          />
        </div>
      </div>
      <input type="submit" />
    </form>
  );
}

export default BookForm;
