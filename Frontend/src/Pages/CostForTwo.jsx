import { useState } from "react";
import "../Style/CostForTwo.css";

const CostForTwo = ({ setCost, SelectedFood, setFilterFood }) => {
  const [selectData, setSelectData] = useState({
    lessthan: false,
    inbetween: false,
    greaterthan: false,
  });

  function handleCost(e) {
    const { name, checked } = e.target;

    setSelectData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function createPricefilter(filters) {
    return function (item) {
      const { lessthan, greaterthan, inbetween } = filters;

      if (!lessthan && !inbetween && !greaterthan) {
        return true;
      }

      return (
        (lessthan && item.price <= 200) ||
        (inbetween && item.price >= 100 && item.price <= 200) ||
        (greaterthan && item.price > 200)
      );
    };
  }

  function handleApply() {
    const data = [...SelectedFood.foods];

    const filter = data.filter(createPricefilter(selectData));

    setFilterFood(filter);
    setCost(false);
  }

  function clearFilters() {
    const data = [...SelectedFood.foods];

    setSelectData({
      lessthan: false,
      inbetween: false,
      greaterthan: false,
    });

    setFilterFood(data);
    setCost(false);
  }

  return (
    <div className="cost-filter">

      {/* Modal */}
      <div className="cost-filter__modal">

        {/* Header */}
        <div className="cost-filter__header">
          <h3 className="cost-filter__title">
            Cost For Two
          </h3>

          <button
            type="button"
            className="cost-filter__close"
            onClick={() => setCost(false)}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="cost-filter__body">

          {/* Less than */}
          <label className="cost-filter__option">
            <input
              type="checkbox"
              name="lessthan"
              checked={selectData.lessthan}
              onChange={handleCost}
            />

            <span>
              Less than Rs. 100
            </span>
          </label>

          {/* In Between */}
          <label className="cost-filter__option">
            <input
              type="checkbox"
              name="inbetween"
              checked={selectData.inbetween}
              onChange={handleCost}
            />

            <span>
              Rs. 100 - Rs. 600
            </span>
          </label>

          {/* Greater than */}
          <label className="cost-filter__option">
            <input
              type="checkbox"
              name="greaterthan"
              checked={selectData.greaterthan}
              onChange={handleCost}
            />

            <span>
              Greater than Rs. 300
            </span>
          </label>

        </div>

        {/* Footer */}
        <div className="cost-filter__footer">

          <button
            type="button"
            onClick={clearFilters}
            className="cost-filter__clear-btn"
          >
            Clear Filters
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="cost-filter__apply-btn"
          >
            Apply
          </button>

        </div>

      </div>
    </div>
  );
};

export default CostForTwo;