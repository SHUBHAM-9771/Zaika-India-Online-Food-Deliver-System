import React, { useState } from "react";
import "../Style/Rating.css";

const Rating = ({ setRating, SelectedFood, setFilterFood }) => {
  const [selectedRating, setSelectedRating] = useState({
    all: false,
    four: false,
    fourFive: false,
  });

  // Handle checkbox
  function handleRating(e) {
    const { name, checked } = e.target;

    setSelectedRating((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  // Create rating filter
  function createRatingfilter(filter) {
    return function (item) {
      const { all, four, fourFive } = filter;

      // No filter selected
      if (!all && !four && !fourFive) {
        return true;
      }

      return (
        (all && item.rating >= 3.0 && item.rating <= 5.0) ||
        (four && item.rating <= 4.5) ||
        (fourFive && item.rating >= 4.5)
      );
    };
  }

  // Apply filter
  function handleApply() {
    const data = [...SelectedFood.foods];

    const filterRating = data.filter(createRatingfilter(selectedRating));

    setFilterFood(filterRating);
    setRating(false);
  }

  // Clear filter
  function handleClear() {
    const data = [...SelectedFood.foods];

    setSelectedRating({
      all: false,
      four: false,
      fourFive: false,
    });

    setFilterFood(data);
    setRating(false);
  }

  return (
    <section className="rating-filter">
      {/* Overlay */}
      <div className="rating-filter__overlay">
        {/* Modal */}
        <div className="rating-filter__modal">
          {/* Header */}
          <div className="rating-filter__header">
            <h3 className="rating-filter__title">Rating</h3>

            <button
              type="button"
              onClick={() => setRating(false)}
              className="rating-filter__close-btn"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="rating-filter__body">
            {/* All Rating */}
            <div className="rating-filter__option">
              <label htmlFor="allRating">
                <input
                  type="checkbox"
                  name="all"
                  id="allRating"
                  checked={selectedRating.all}
                  onChange={handleRating}
                />
                &nbsp;Rating
              </label>
            </div>

            {/* 4.0+ */}
            <div className="rating-filter__option">
              <label htmlFor="fourRating">
                <input
                  type="checkbox"
                  name="four"
                  id="fourRating"
                  checked={selectedRating.four}
                  onChange={handleRating}
                />
                &nbsp;Ratings 4.0+
              </label>
            </div>

            {/* 4.5+ */}
            <div className="rating-filter__option">
              <label htmlFor="fourFiveRating">
                <input
                  type="checkbox"
                  name="fourFive"
                  id="fourFiveRating"
                  checked={selectedRating.fourFive}
                  onChange={handleRating}
                />
                &nbsp;Ratings 4.5+
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="rating-filter__footer">
            <button
              type="button"
              onClick={handleClear}
              className="rating-filter__btn"
            >
              Clear Filter
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="rating-filter__btn"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rating;
