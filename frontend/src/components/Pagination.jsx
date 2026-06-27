import React from "react";
import { useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronFirst,
  ChevronRight,
  ChevronLast,
  Ellipsis,
} from "lucide-react";

function Pagination({ currentPage, onPageChange }) {
  const { totalPages, products } = useSelector((state) => state.product);
  if (products.length === 0 || totalPages <= 1) return null;

  //   Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className="btn-pagination"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <ChevronFirst size={24} color="#fff" />
      </button>
      <button
        className="btn-pagination"
        onClick={() => onPageChange(currentPage - 1 < 1 ? 1 : currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={24} color="#fff" />
      </button>
      {pageNumbers.map((number) => {
        // Always show first & last page
        if (number === 1 || number === totalPages) {
          return (
            <button
              key={number}
              className={`btn-pagination ${
                currentPage === number ? "pagination-active" : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              <span className="p-2">{number}</span>
            </button>
          );
        }

        // Show current window (current-1, current, current+1)
        if (
          number === currentPage ||
          number === currentPage - 1 ||
          number === currentPage + 1
        ) {
          return (
            <button
              key={number}
              className={`btn-pagination ${
                currentPage === number ? "pagination-active" : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              <span className="p-2">{number}</span>
            </button>
          );
        }

        // Left dots (between 1 and currentPage-1)
        if (number === 2 && currentPage > 2) {
          return (
            <span key={number} className="p-2">
              <Ellipsis size={18} />
            </span>
          );
        }

        // Right dots (between currentPage+1 and last)
        if (number === totalPages - 1 && currentPage < totalPages - 1) {
          return (
            <span key={number} className="p-2">
              <Ellipsis size={18} />
            </span>
          );
        }

        return null;
      })}
      <button
        className="btn-pagination"
        onClick={() =>
          onPageChange(
            currentPage + 1 > totalPages ? totalPages : currentPage + 1,
          )
        }
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={24} color="#fff" />
      </button>
      <button
        className="btn-pagination"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronLast size={24} color="#fff" />
      </button>
    </div>
  );
}

export default Pagination;
