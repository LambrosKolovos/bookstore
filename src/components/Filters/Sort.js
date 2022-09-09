import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./_filters.scss";
import { useDispatch } from "react-redux";
import { setSortingOption } from "../../redux/filterSlice";

function Sort() {
  const [sort, setSort] = useState("");
  const dispatch = useDispatch();

  const handleSortChange = (event) => {
    dispatch(setSortingOption(event.target.value));
    setSort(event.target.value);
  };
  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, minWidth: 120 }}
      className="filters__sort"
    >
      <label className="filters__label">Sort by</label>
      <Select
        displayEmpty
        value={sort}
        onChange={handleSortChange}
        disableUnderline
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"newSort"}>Newest</MenuItem>
        <MenuItem value={"oldSort"}>Oldest</MenuItem>
        <MenuItem value={"azSort"}>A-Z</MenuItem>
        <MenuItem value={"zaSort"}>Z-A</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Sort;
