import React, { useState } from "react";
import "../Style/SortBy.css";

const SortBy = ({ setSortBy, result, setFilteredFoods }) => {
  const [selectedSort, setSelectedSort] = useState("");

  function handleSort(e) {
    setSelectedSort(e.target.value);
  }

  // Closure
  function createSortBy(selectedSort) {
    return function (data) {
      switch (selectedSort) {
        case "default":
          return data;

        case "rating":
          return [...data].sort((a, b) => b.rating - a.rating);

        case "lowToHigh":
          return [...data].sort((a, b) => b.price - a.price);

        case "highTolow":
          return [...data].sort((a, b) => a.price - b.price);

        default:
          return data;
      }
    };
  }

  function handleSortBy() {
    const data = [...result];

    const sortFunction = createSortBy(selectedSort);
    const sortedData = sortFunction(data);

    console.log("Final sorted data:", sortedData);

    setFilteredFoods(sortedData);
    setSortBy(false);
  }
  return (
    <section className="sort-filter">
      <div className="sort-filter__overlay">
        <div className="sort-filter__modal">
          {/* Header */}
          <div className="sort-filter__header">
            <h3 className="sort-filter__title">Sort By</h3>

            <button
              onClick={() => setSortBy(false)}
              type="button"
              className="sort-filter__close-btn"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="sort-filter__body">
            {/* Default */}
            <div className="sort-filter__option">
              <label htmlFor="default">
                <input
                  type="radio"
                  name="sort"
                  id="default"
                  value="default"
                  onChange={handleSort}
                />
                Default
              </label>
            </div>

            {/* Delivery Time */}
            {/* <div className="sort-filter__option">
              <label htmlFor="deliveryTime">
                <input
                  type="radio"
                  name="sort"
                  id="deliveryTime"
                  value="lowToHigh"
                  checked={selectedSort=== "lowToHigh"}
                  checked={selectedSort.deliveryTime}
                  onChange={handleSort}
                />
                Delivery Time
              </label>
            </div> */}

            {/* Rating */}
            <div className="sort-filter__option">
              <label htmlFor="rating">
                <input
                  type="radio"
                  name="sort"
                  id="rating"
                  value="rating"
                  onChange={handleSort}
                />
                Rating
              </label>
            </div>

            {/* Low to High */}
            <div className="sort-filter__option">
              <label htmlFor="lowToHigh">
                <input
                  type="radio"
                  name="sort"
                  id="lowToHigh"
                  value="lowToHigh"
                  onChange={handleSort}
                />
                Cost : Low to High
              </label>
            </div>

            {/* High to Low */}
            <div className="sort-filter__option">
              <label htmlFor="highToLow">
                <input
                  type="radio"
                  name="sort"
                  id="highToLow"
                  value="highToLow"
                  onChange={handleSort}
                />
                Cost : High to Low
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="sort-filter__footer">
            <button
              onClick={() => handleSortBy(selectedSort)}
              type="button"
              className="sort-filter__apply-btn"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SortBy;
