import { Button, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { TbHeartOff } from "react-icons/tb";

import "./_bookPreviewPage.scss";

function BookPreviewPage() {
  const { state } = useLocation();
  const { bookToDisplay } = state;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(
      JSON.parse(localStorage.getItem("favorites")).includes(bookToDisplay.isbn)
    );
  }, [isFavorite]);

  const addFavoriteBook = (isbn) => {
    var tempFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    tempFavs = [...tempFavs, isbn];

    setIsFavorite(true);
    localStorage.setItem("favorites", JSON.stringify(tempFavs));
  };

  const removeFavorite = (isbn) => {
    var tempFavs = JSON.parse(localStorage.getItem("favorites")) || [];

    tempFavs = tempFavs.filter((bookIsbn) => bookIsbn !== isbn);
    setIsFavorite(false);
    localStorage.setItem("favorites", JSON.stringify(tempFavs));
  };
  return (
    <div>
      <Header />
      <div className="bookpreview__wrapper">
        <div className="bookpreview__leftcontainer">
          <img
            className="bookpreview__image"
            src={bookToDisplay.image}
            alt="book cover"
          />
          <div className="bookpreview__author">{bookToDisplay.author}</div>
          <div>
            <Rating
              name="half-rating-read"
              value={bookToDisplay.rating}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
        <div className="bookpreview__rightcontainer">
          <div className="bookpreview__title">{bookToDisplay.title}</div>
          <div className="bookpreview__description">
            {bookToDisplay.description}
          </div>
          <div>
            {isFavorite ? (
              <Button
                variant="outlined"
                startIcon={<TbHeartOff />}
                onClick={() => removeFavorite(bookToDisplay.isbn)}
                style={{
                  color: "red",
                  background: "white",
                  border: "1px solid red",
                  marginRight: "20px",
                }}
              >
                Unfavorite
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<AiOutlineHeart />}
                onClick={() => addFavoriteBook(bookToDisplay.isbn)}
                style={{
                  color: "white",
                  background: "red",
                  border: "none",
                  marginRight: "20px",
                }}
              >
                Favorite
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<AiOutlineShareAlt />}
              style={{
                color: "white",
                background: "darkblue",
                border: "none",
              }}
            >
              Share
            </Button>
          </div>
          <div className="bookpreview__year">
            <b>Date released</b>: {bookToDisplay.published.slice(0, 10)}
          </div>
          <div>
            <b>Pages</b>: {bookToDisplay.pages}
          </div>

          <div className="bookpreview__publisher">
            <b>Publisher</b>: {bookToDisplay.publisher}
          </div>
          <div>
            <b>ISBN-10</b>: {bookToDisplay.isbn}
          </div>
          <div className="bookpreview__website">
            <b>Website</b>:
            {bookToDisplay.website
              ? " " + bookToDisplay.website
              : " Not provided"}
          </div>
          <button className="bookpreview__buybutton">BUY</button>
        </div>
      </div>
    </div>
  );
}

export default BookPreviewPage;
