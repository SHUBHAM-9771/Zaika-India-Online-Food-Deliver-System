import React, { useState } from "react";
import "../Style/Filter.css";

const Filter = ({ filter, setFilter, result, setFilteredFoods }) => {
  const [selectedfilter, setSelectfilter] = useState(null);

  function handleselect(e) {
    setSelectfilter(e.target.value);
  }

  function createfilter(selectedfilter) {
    return function (data) {
      switch (selectedfilter) {
        case "rating":
          return [...data].sort((a, b) => b.rating - a.rating);

        case "lowToHigh":
          return [...data].sort((a, b) => b.price - a.price);

        case "HIghTolow":
          return [...data].sort((a, b) => a.price - b.price);

        case "veg":
          return [...data].filter((item) => {
            return item.itemTypes === "veg";
          });
        case "nonveg":
          return [...data].filter((item) => {
            return item.itemTypes === "nonveg";
          });

        default:
          return data;
      }
    };
  }

  function handlefilter() {
    let filterFunction = createfilter(selectedfilter);
    let filterdata = filterFunction(result);
    setFilteredFoods(filterdata);
    setFilter(false);
  }

  // function clearFilter() {
  //   setSelectfilter("");
  //   setFilteredFoods(result);
  // }

  return (
    <section className="filter">
      {/* Overlay */}
      <div className="filter__overlay">
        {/* Modal */}
        <div className="filter__modal">
          {/* Header */}
          <div className="filter__header">
            <h3 className="filter__title">Filter</h3>

            <button
              type="button"
              onClick={() => setFilter(false)}
              className="filter__close-btn"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="filter__body">
            {/* Left Sidebar */}
            <div className="filter__sidebar">
              <p className="filter__menu-item">Sort</p>

              <p className="filter__menu-item">Rating</p>

              <p className="filter__menu-item">Veg / Non-Veg</p>
            </div>

            {/* Right Content */}
            <div className="filter__content">
              {/* Sort */}
              <h4 className="filter__heading">SORT BY</h4>

              <div className="filter__option">
                <label htmlFor="rating">
                  <input
                    type="radio"
                    id="rating"
                    name="sort"
                    value="rating"
                    onChange={handleselect}
                  />
                  Rating
                </label>
              </div>

              <div className="filter__option">
                <label htmlFor="lowHigh">
                  <input
                    type="radio"
                    id="lowHigh"
                    name="sort"
                    value={lowToHigh}
                    onChange={handleselect}
                  />
                  Cost : Low to High
                </label>
              </div>

              <div className="filter__option">
                <label htmlFor="highLow">
                  <input
                    type="radio"
                    id="highLow"
                    name="sort"
                    value={HighTolow}
                    onChange={handleselect}
                  />
                  Cost : High to Low
                </label>
              </div>

              <hr />

              {/* Veg / Non-Veg */}
              <h4 className="filter__heading">VEG / NON-VEG</h4>

              <div className="filter__option">
                <label htmlFor="veg">
                  <input
                    type="radio"
                    id="veg"
                    name="foodType"
                    value={veg}
                    onChange={handleselect}
                  />
                  Veg
                </label>
              </div>

              <div className="filter__option">
                <label htmlFor="nonVeg">
                  <input
                    type="radio"
                    id="nonVeg"
                    name="foodType"
                    value={nonveg}
                    onChange={handleselect}
                  />
                  Non-Veg
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="filter__footer">
            <button type="button" className="filter__clear-btn">
              Clear Filter
            </button>

            <button
              type="button"
              className="filter__apply-btn"
              onClick={handlefilter}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filter;
