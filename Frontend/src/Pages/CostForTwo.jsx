import { useState } from "react";
import "../Style/CostForTwo.css";

const CostForTwo = ({ setCostForTwo, result, setFilteredFoods }) => {
  const [selectData, setSelectData] = useState({
    lessthan: false,
    greaterthan: false,
    inbetween: false,
  });

  console.log(selectData);

  function handleCost(e) {
    const { name, value, checked } = e.target;

    setSelectData({
      lessthan: false,
      greaterthan: false,
      inbetween: false,
      [name]: checked,
    });
  }

  function createPricefilter(filters) {
    return function (data) {
      const { lessthan, greaterthan, inbetween } = filters;

      if (!lessthan && !greaterthan && !inbetween) {
        return data;
      }
      return data.filter((item) => {
        return (
          (lessthan && item.price <= 100) ||
          (greaterthan && item.price > 100) ||
          (inbetween && item.price > 200 && item.price <= 300)
        );
      });
    };
  }

  function handleApply() {
    let data = [...result];
    let costfilter = createPricefilter(selectData);
    let filter = costfilter(data);
    console.log(filter);
    setFilteredFoods(filter);
    setCostForTwo(false);
  }

  function clearfilter() {
    setSelectData({
      lessthan: false,
      greaterthan: false,
      inbetween: false,
    });

    setCostForTwo(false);
    setFilteredFoods(result);
  }

  // function createPricefilter(filters) {
  //   return function inner(foodItem) {
  //     const { lessthan, greaterthan, inbetween } = filters;

  //     if (!lessthan && !greaterthan && !inbetween) {
  //       return true;
  //     }

  //     return (
  //       (lessthan && foodItem.price <= 100) ||
  //       (greaterthan && foodItem.price >= 100) ||
  //       (inbetween && foodItem.price >= 500 && foodItem.price <= 600)
  //     );
  //   };
  // }

  // function ApplyFilter() {
  //   const foodItem = [...result];
  //   const filterFunction = createPricefilter(selectData);
  //   const filteredFood = foodItem.filter(filterFunction);
  //   console.log(filteredFood);
  // }

  return (
    <div className="cost-filter">
      {/* Modal */}
      <div className="cost-filter__modal">
        {/* Header */}
        <div className="cost-filter__header">
          <h3 className="cost-filter__title">Cost For Two</h3>

          <button
            type="button"
            className="cost-filter__close"
            onClick={() => setCostForTwo(false)}
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

            <span>Less than Rs. 100</span>
          </label>

          {/* Greater than */}
          <label className="cost-filter__option">
            <input
              type="checkbox"
              name="greaterthan"
              checked={selectData.greaterthan}
              onChange={handleCost}
            />

            <span>Greater than Rs. 100</span>
          </label>

          {/* In Between */}
          <label className="cost-filter__option">
            <input
              type="checkbox"
              name="inbetween"
              checked={selectData.inbetween}
              onChange={handleCost}
            />

            <span>Rs. 200- Rs. 300</span>
          </label>
        </div>

        {/* Footer */}
        <div className="cost-filter__footer">
          <button
            type="button"
            className="cost-filter__clear-btn"
            onClick={clearfilter}
          >
            Clear Filters
          </button>

          <button
            type="button"
            className="cost-filter__apply-btn"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostForTwo;
