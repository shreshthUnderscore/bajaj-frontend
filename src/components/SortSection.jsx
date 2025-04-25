import React from "react";

function SortSection({ sort, setSort }) {
  return (
    <div className="sort-section">
      <div className="sort-header">
        <h3>Sort by</h3>
        <i className="fa fa-chevron-up"></i>
      </div>
      <div className="sort-options">
        <div className="sort-option">
          <input
            type="radio"
            id="price"
            name="sort"
            checked={sort === "price"}
            onChange={() => setSort("price")}
          />
          <label htmlFor="price">Price: Low-High</label>
        </div>
        <div className="sort-option">
          <input
            type="radio"
            id="experience"
            name="sort"
            checked={sort === "experience"}
            onChange={() => setSort("experience")}
          />
          <label htmlFor="experience">Experience: Most Experience first</label>
        </div>
      </div>
    </div>
  );
}

export default SortSection;
