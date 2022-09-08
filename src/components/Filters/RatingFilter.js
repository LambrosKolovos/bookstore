import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./_filters.scss";
import { setRatingFilter } from "../../redux/filterSlice";
import { useDispatch } from "react-redux";

function RatingFilter() {
  const [rating, setRating] = useState("");
  const dispatch = useDispatch();

  const handleRatingFilterChange = (event) => {
    dispatch(setRatingFilter(event.target.value));
    setRating(event.target.value);
  };
  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, minWidth: 120 }}
      className="filters__rating"
    >
      <label className="filters__label">Rating</label>
      <Select
        disableUnderline
        displayEmpty
        value={rating}
        onChange={handleRatingFilterChange}
      >
        <MenuItem value="">
          <em>All ratings</em>
        </MenuItem>
        <MenuItem value={3}>3⭐ or more</MenuItem>
        <MenuItem value={4}>4⭐ or more</MenuItem>
        <MenuItem value={5}>5⭐ only</MenuItem>
      </Select>
    </FormControl>
  );
}

export default RatingFilter;
