import React from "react";
import FavoriteFilter from "./FavoriteFilter";
import RatingFilter from "./RatingFilter";
import Sort from "./Sort";
import "./_filters.scss";

function Filters() {
  return (
    <div className="filters__container">
      <Sort />
      <RatingFilter />
      <FavoriteFilter />
    </div>
  );
}

export default Filters;
