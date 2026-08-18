import React, { useState } from "react";
import "../Style/SortBy.css";

const SortBy = ({ setSortBy, SelectedFood, setFilterFood }) => {
  const [selectedSort, setSelectedSort] = useState({
    default: false,
    rating: false,
    deliveryTime: false,
    lowToHigh: false,
    highToLow: false,
  });

  function handleSort(e) {
    const { name, checked } = e.target;

    setSelectedSort((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function handleSortBy() {
    const data = [...SelectedFood.foods];

    let filterSortBy = data;

    if (selectedSort.default) {
      filterSortBy = data;
    }

    if (selectedSort.rating) {
      filterSortBy = data.sort((a, b) => {
        return b.rating - a.rating;
      });
    }

    if (selectedSort.lowToHigh) {
      filterSortBy = data.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (selectedSort.highToLow) {
      filterSortBy = data.sort((a, b) => {
        return b.price - a.price;
      });
    }

    setFilterFood(filterSortBy);
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
                  checked={selectedSort.default}
                  onChange={handleSort}
                />
                Default
              </label>
            </div>

            {/* Delivery Time */}
            <div className="sort-filter__option">
              <label htmlFor="deliveryTime">
                <input
                  type="radio"
                  name="sort"
                  id="deliveryTime"
                  checked={selectedSort.deliveryTime}
                  onChange={handleSort}
                />
                Delivery Time
              </label>
            </div>

            {/* Rating */}
            <div className="sort-filter__option">
              <label htmlFor="rating">
                <input
                  type="radio"
                  name="sort"
                  id="rating"
                  checked={selectedSort.rating}
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
                  checked={selectedSort.lowToHigh}
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
                  checked={selectedSort.highToLow}
                  onChange={handleSort}
                />
                Cost : High to Low
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="sort-filter__footer">
            <button
              onClick={handleSortBy}
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
