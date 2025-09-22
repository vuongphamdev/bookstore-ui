import React from "react";
import { useGetBooksQuery } from "../api";

const Dashboard: React.FC = () => {
  const { data: books, isLoading, error } = useGetBooksQuery();

  const stats = {
    totalBooks: books?.length || 0,
    totalStock: books?.reduce((sum, book) => sum + book.stock, 0) || 0,
    averagePrice: books?.length
      ? (
          books.reduce((sum, book) => sum + book.price, 0) / books.length
        ).toFixed(2)
      : "0.00",
    lowStockBooks: books?.filter((book) => book.stock < 10).length || 0,
  };

  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">Error loading dashboard data</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Bookstore Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Books</h3>
          <div className="stat-value">{stats.totalBooks}</div>
        </div>

        <div className="stat-card">
          <h3>Total Stock</h3>
          <div className="stat-value">{stats.totalStock}</div>
        </div>

        <div className="stat-card">
          <h3>Average Price</h3>
          <div className="stat-value">${stats.averagePrice}</div>
        </div>

        <div className="stat-card">
          <h3>Low Stock Alert</h3>
          <div className="stat-value">{stats.lowStockBooks}</div>
          <div className="stat-subtitle">books &lt; 10 in stock</div>
        </div>
      </div>

      <div className="dashboard-sections">
        <section className="recent-books">
          <h2>Recent Books</h2>
          <div className="book-list">
            {books?.slice(0, 5).map((book) => (
              <div key={book.id} className="book-item">
                <div className="book-info">
                  <strong>{book.title}</strong>
                  <span>by {book.author}</span>
                </div>
                <div className="book-details">
                  <span className="price">${book.price.toFixed(2)}</span>
                  <span className="stock">Stock: {book.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="low-stock-alert">
          <h2>Low Stock Alert</h2>
          <div className="book-list">
            {books
              ?.filter((book) => book.stock < 10)
              .map((book) => (
                <div key={book.id} className="book-item low-stock">
                  <div className="book-info">
                    <strong>{book.title}</strong>
                    <span>by {book.author}</span>
                  </div>
                  <div className="book-details">
                    <span className="stock urgent">
                      Only {book.stock} left!
                    </span>
                  </div>
                </div>
              ))}
          </div>
          {stats.lowStockBooks === 0 && <p>All books are well stocked!</p>}
        </section>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn">Add New Book</button>
          <button className="action-btn">View Orders</button>
          <button className="action-btn">Manage Inventory</button>
          <button className="action-btn">Sales Report</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
