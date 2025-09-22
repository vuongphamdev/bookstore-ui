import React, { useState } from "react";
import { useGetBooksQuery, useSearchBooksQuery } from "../api";

const Books: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { data: allBooks, error, isLoading } = useGetBooksQuery();
  const { data: searchResults } = useSearchBooksQuery(searchTerm, {
    skip: !isSearching || !searchTerm,
  });

  const booksToDisplay = isSearching && searchTerm ? searchResults : allBooks;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  if (isLoading) {
    return <div className="loading">Loading books...</div>;
  }

  if (error) {
    return <div className="error">Error loading books</div>;
  }

  return (
    <div className="books-container">
      <h1>Bookstore</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for books..."
          className="search-input"
        />
        <button type="submit">Search</button>
        {isSearching && (
          <button type="button" onClick={clearSearch}>
            Clear
          </button>
        )}
      </form>

      <div className="books-grid">
        {booksToDisplay?.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <p className="price">${book.price.toFixed(2)}</p>
            <p className="stock">Stock: {book.stock}</p>
            {book.description && (
              <p className="description">{book.description}</p>
            )}
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>

      {booksToDisplay && booksToDisplay.length === 0 && (
        <div className="no-books">No books found</div>
      )}
    </div>
  );
};

export default Books;
