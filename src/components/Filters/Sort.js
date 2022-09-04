import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
      sx={{ m: 1, minWidth: 120, marginLeft: "60px" }}
      className="filters__sort"
    >
      <InputLabel>Sort By</InputLabel>
      <Select
        label="Sort by"
        value={sort}
        onChange={handleSortChange}
        defaultValue=""
      >
        <MenuItem value={"newSort"}>Newest</MenuItem>
        <MenuItem value={"oldSort"}>Oldest</MenuItem>
        <MenuItem value={"azSort"}>A-Z</MenuItem>
        <MenuItem value={"zaSort"}>Z-A</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Sort;
