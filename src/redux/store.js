import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./bookSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    filters: filterReducer,
  },
});
