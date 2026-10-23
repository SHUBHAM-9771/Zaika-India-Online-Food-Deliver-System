import React, { useState } from "react";
import "../Style/Rating.css";

const Rating = ({ setRating, result, setFilteredFoods }) => {
  console.log(result);
  const [selectedRating, setSelectedRating] = useState({
    all: false,
    four: false,
    fourFive: false,
  });

  console.log(selectedRating);

  function handleRating(e) {
    const { name, checked } = e.target;

    setSelectedRating((prev) => {
      if (name === "all") {
        return {
          all: checked,
          four: false,
          fourFive: false,
        };
      }

      return {
        ...prev,
        all: false,
        [name]: checked,
      };
    });
  }

  function createRatingfilter(filter) {
    return function (result) {
      if (filter.all || (!filter.four && !filter.fourFive)) {
        return result;
      }

      return result.filter((item) => {
        return (
          (filter.four && item.rating <= 4.3) ||
          (filter.fourFive && item.rating > 4.3)
        );
      });
    };
  }

  function handleApply() {
    let Ratingfilter = createRatingfilter(selectedRating);
    let filter = Ratingfilter(result);
    setFilteredFoods(filter);
    setRating(false);
  }

  // clear all check box
  function handleClear() {
    setSelectedRating({
      all: false,
      four: false,
      fourFive: false,
    });
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
              className="rating-filter__close-btn"
              onClick={() => setRating(false)}
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
                &nbsp;Ratings below of 4.3
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
                &nbsp;Ratings 4.3+
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
              className="rating-filter__btn"
              onClick={handleApply}
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
