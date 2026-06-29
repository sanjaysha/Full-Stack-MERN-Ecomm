import React, { useState, lazy, Suspense } from "react";
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
const UserDashboard = lazy(() => import("./UserDashboard"));

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { isAuthenticated, user } = useSelector((state) => state.user);
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
    <nav className="relative bg-olive-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center shrink-0">
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
                        flex-col absolute top-16 left-0 w-full bg-olive-600 ml-5 gap-0
                        md:static md:flex md:flex-row md:bg-transparent md:p-0 md:gap-6`}
          >
            {navLinks.map((navLink, index) => (
              <li key={index}>
                <Link
                  to={navLink.to}
                  className="transition-colors hover:text-amber-200"
                >
                  {navLink.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
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
            <span className=" absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white ">
              {cartItems.length}
            </span>
          </Link>

          {/* User */}
          {!isAuthenticated ? (
            <Link to="/register">
              <UserPlus />
            </Link>
          ) : (
            <Suspense fallback={null}>
              <UserDashboard user={user} />
            </Suspense>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen ? <CircleX /> : <Menu />}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50" onClick={toggleMenu}></div>
          <div className="md:hidden absolute top-full left-0 z-50 w-full bg-olive-600 shadow-lg">
            <ul className="flex flex-col divide-y divide-olive-500">
              {navLinks.map((navLink, index) => (
                <li key={index}>
                  <Link
                    to={navLink.to}
                    className="block px-4 sm:px-6 py-3 md:py-4 hover:bg-olive-500 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {navLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
