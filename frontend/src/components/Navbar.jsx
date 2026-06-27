import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  UserPlus,
  Menu,
  CircleX,
  UserRoundCheck,
} from "lucide-react";
import { useSelector } from "react-redux";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/products");
    }
    setSearchQuery("");
  };
  return (
    <nav className="bg-olive-600 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-xl font-semibold"
          >
            Aravali
          </Link>

          {/* Links */}
          <ul
            className={`${isMenuOpen ? "flex" : "hidden"} 
                        flex-col absolute top-16 left-0 w-full bg-olive-600 p-4 gap-4
                        md:static md:flex md:flex-row md:bg-transparent md:p-0 md:gap-6`}
          >
            <li>
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-gray-200">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form
            className={`hidden md:flex items-center bg-white rounded-full overflow-hidden transition duration-2000 ${isSearchOpen ? "ease-out" : "ease-in"}`}
            onSubmit={handleSearchSubmit}
          >
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Search products..."
                className="px-3 text-black outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}

            <button
              type="button"
              className="btn-search "
              onClick={toggleSearch}
            >
              <Search size={18} />
            </button>
          </form>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 rounded-full">
              {cartItems.length}
            </span>
          </Link>

          {/* User */}
          {!isAuthenticated && (
            <Link to="/register">
              <UserPlus />
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen ? <CircleX /> : <Menu />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
