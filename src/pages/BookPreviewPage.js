import { Button, Rating } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";

import "./_bookPreviewPage.scss";

function BookPreviewPage() {
  const { state } = useLocation();
  const { bookToDisplay } = state;
  return (
    <div>
      <Header />
      <div className="bookpreview__wrapper">
        <div className="bookpreview__leftcontainer">
          <img className="bookpreview__image" src={bookToDisplay.image} />
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
            <Button
              variant="outlined"
              startIcon={<AiOutlineHeart />}
              style={{
                color: "white",
                background: "red",
                border: "none",
                marginRight: "20px",
              }}
            >
              Favorite
            </Button>
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
          <div>
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
