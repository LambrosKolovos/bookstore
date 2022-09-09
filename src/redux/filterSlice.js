import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rating: 0,
  azSort: false,
  zaSort: false,
  newSort: false,
  oldSort: false,
  favorite: false,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSortingOption: (state, value) => {
      state.azSort = false;
      state.zaSort = false;
      state.newSort = false;
      state.oldSort = false;

      switch (value.payload) {
        case "azSort":
          state.azSort = true;
          break;
        case "zaSort":
          state.zaSort = true;
          break;
        case "newSort":
          state.newSort = true;
          break;
        case "oldSort":
          state.oldSort = true;
          break;
        default:
          return;
      }
    },

    setRatingFilter: (state, action) => {
      state.rating = action.payload;
    },

    setFavoriteFilter: (state, action) => {
      action.payload === "favorite"
        ? (state.favorite = true)
        : (state.favorite = false);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSortingOption, setRatingFilter, setFavoriteFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
