import { createSlice } from "@reduxjs/toolkit";
import { booksData } from "../booksData";

const initialState = {
  booksDB: booksData,
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    insertBook: (state, book) => {
      state.booksDB = [...state.booksDB, book.payload];
      console.log(state.booksDB);
    },
  },
});

// Action creators are generated for each case reducer function
export const { insertBook } = bookSlice.actions;

export default bookSlice.reducer;
