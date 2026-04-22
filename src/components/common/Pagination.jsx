import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}> 
      
      <div className="pagination">
        <button className="page-btn" onClick={handlePrev}>
          Prev
        </button>

        <div className="page-numbers">
          {pages.map((num) => (
            <div
              key={num}
              className={`page-number ${currentPage === num ? "active" : ""}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </div>
          ))}
        </div>

        <button className="page-btn" onClick={handleNext}>
          Next
        </button>
      </div>

    </div>
  );
};

export default Pagination;