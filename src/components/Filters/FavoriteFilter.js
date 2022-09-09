import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./_filters.scss";
import { setFavoriteFilter } from "../../redux/filterSlice";
import { useDispatch } from "react-redux";

function FavoriteFilter() {
  const [favorite, setFavorite] = useState("");
  const dispatch = useDispatch();

  const handleFavoriteChange = (event) => {
    dispatch(setFavoriteFilter(event.target.value));
    setFavorite(event.target.value);
  };
  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, minWidth: 120 }}
      className="filters__rating"
    >
      <label className="filters__label">Favorite</label>
      <Select
        disableUnderline
        displayEmpty
        value={favorite}
        onChange={handleFavoriteChange}
      >
        <MenuItem value="">
          <em>All books</em>
        </MenuItem>
        <MenuItem value={"favorite"}>Favorite only</MenuItem>
      </Select>
    </FormControl>
  );
}

export default FavoriteFilter;
