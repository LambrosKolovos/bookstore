import React from "react";
import "./_bookitem.scss";
import Rating from "@mui/material/Rating";

function BookItem({ image, title, author, rating, onClick }) {
  return (
    <div className="bookitem__container" onClick={onClick}>
      <img src={image} height="300" width="200" alt="book cover" />
      <div className="bookitem__title">{title}</div>
      <div className="bookitem__author">{author}</div>
      <div className="bookitem__rating">
        <Rating
          name="half-rating-read"
          value={rating}
          precision={0.5}
          readOnly
        />
      </div>
      <button className="bookitem__buy">Buy now</button>
    </div>
  );
}

export default BookItem;
