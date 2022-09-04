import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRatingFilter, setSortingOption } from "../../redux/filterSlice";
import RatingFilter from "./RatingFilter";
import Sort from "./Sort";
import "./_filters.scss";

function Filters() {
  return (
    <div className="filters__container">
      <Sort />
      <RatingFilter />
    </div>
  );
}

export default Filters;
