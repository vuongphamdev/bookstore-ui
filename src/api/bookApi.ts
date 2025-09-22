import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../config/baseQuery";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description?: string;
  category?: string;
  stock: number;
}

interface CreateBookRequest {
  title: string;
  author: string;
  price: number;
  description?: string;
  category?: string;
  stock: number;
}

interface UpdateBookRequest extends Partial<CreateBookRequest> {
  id: string;
}

const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => "books",
      providesTags: ["Book"],
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),
    createBook: builder.mutation<Book, CreateBookRequest>({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<Book, UpdateBookRequest>({
      query: ({ id, ...patch }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Book", id }],
    }),
    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),
    searchBooks: builder.query<Book[], string>({
      query: (searchTerm) => `books/search?q=${encodeURIComponent(searchTerm)}`,
      providesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useSearchBooksQuery,
} = bookApi;
