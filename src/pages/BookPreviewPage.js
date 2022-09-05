import { Rating } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";

import "./_bookPreviewPage.scss";

function BookPreviewPage() {
  const { state } = useLocation();
  const { bookToDisplay } = state;
  return (
    <div>
      <Header />
      <div className="bookpreview__wrapper">
        <div className="bookpreview__leftcontainer">
          <img src={bookToDisplay.image} height="450px" width="300px" />
          <div>{bookToDisplay.author}</div>
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
            <button>Favorite</button>
            <button>Share</button>
          </div>
          <div className="bookpreview__year">
            <b>Year</b>: {bookToDisplay.published.slice(0, 4)}
          </div>
          <div>
            <b>Number of pages</b>: {bookToDisplay.pages}
          </div>
          <div className="bookpreview__publisher">
            <b>Publisher</b>: {bookToDisplay.publisher}
          </div>
          <div>
            <b>ISBN-10</b>: {bookToDisplay.isbn}
          </div>
          <button className="bookpreview__buybutton">BUY</button>
        </div>
      </div>
    </div>
  );
}

export default BookPreviewPage;
