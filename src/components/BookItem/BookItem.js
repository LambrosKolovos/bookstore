import React from "react";
import "./_bookitem.scss";
import Rating from "@mui/material/Rating";

function BookItem({ image, title, author, rating }) {
  return (
    <div className="bookitem__container">
      <img src={image} height="300" width="200" />
      <div className="bookitem__title">{title}</div>
      <div className="bookitem__author">{author}</div>
      <div>
        <Rating
          name="half-rating-read"
          value={rating}
          precision={0.5}
          readOnly
        />
      </div>
    </div>
  );
}

export default BookItem;
