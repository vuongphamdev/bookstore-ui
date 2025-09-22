import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  currentUser?: {
    id: string;
    name: string;
    email: string;
  };
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      console.log("Logout clicked");
      alert("Logout functionality to be implemented");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          📚 Bookstore
        </Link>
      </div>

      <div className="navbar-nav">
        <Link to="/shop" className="nav-link">
          Shop
        </Link>
        <Link to="/cart" className="nav-link">
          Cart
        </Link>
        {currentUser ? (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <div className="user-menu">
              <span className="user-name">Hello, {currentUser.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link to="/login" className="nav-link login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
