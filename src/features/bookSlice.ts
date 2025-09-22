import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description?: string;
  category?: string;
  stock: number;
}

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
  selectedBook: Book | null;
}

const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
  selectedBook: null,
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooksLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBooksError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    setSelectedBook: (state, action: PayloadAction<Book | null>) => {
      state.selectedBook = action.payload;
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});
