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
      const updatedBookArr = [
        ...JSON.parse(localStorage.getItem("booksStored")),
        book.payload,
      ];
      localStorage.setItem("booksStored", JSON.stringify(updatedBookArr));
    },
  },
});

// Action creators are generated for each case reducer function
export const { insertBook } = bookSlice.actions;

export default bookSlice.reducer;
