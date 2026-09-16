import { useState } from "react";
import "../Style/CostForTwo.css";

const CostForTwo = ({ setCostForTwo, result }) => {
  const [selectData, setSelectData] = useState({
    lessthan: false,
    greaterthan: false,
    inbetween: false,
  });

  console.log(selectData);

  function handleCost(e) {
    const { name, value, checked } = e.target;

    console.log(name);
    console.log(value);
    console.log(checked);

    setSelectData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  // function handleCost(e) {
  //   const { name, checked } = e.target;

  //   setSelectData((prev) => ({
  //     ...prev,
  //     [name]: checked,
  //   }));
  // }

  // function createPricefilter(filters) {
  //   return function (item) {
  //     const { lessthan, greaterthan, inbetween } = filters;

  //     if (!lessthan && !inbetween && !greaterthan) {
  //       return true;
  //     }

  //     return (
  //       (lessthan && item.price <= 200) ||
  //       (inbetween && item.price >= 100 && item.price <= 200) ||
  //       (greaterthan && item.price > 200)
  //     );
  //   };
  // }

  // function handleApply() {
  //   const data = [...SelectedFood.foods];

  //   const filter = data.filter(createPricefilter(selectData));

  //   setFilterFood(filter);
  //   setCost(false);
  // }

  function createPricefilter(filters) {
    return function inner(foodItem) {
      const { lessthan, greaterthan, inbetween } = filters;

      if (!lessthan && !greaterthan && !inbetween) {
        return true;
      }

      return (
        (lessthan && foodItem.price <= 100) ||
        (greaterthan && foodItem.price >= 100) ||
        (inbetween && foodItem.price >= 500 && foodItem.price <= 600)
      );
    };
  }

  function ApplyFilter() {
    const foodItem = [...result];
    const filterFunction = createPricefilter(selectData);
    const filteredFood = foodItem.filter(filterFunction);
    console.log(filteredFood);
  }

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

            <span>Rs. 500 - Rs. 600</span>
          </label>
        </div>

        {/* Footer */}
        <div className="cost-filter__footer">
          <button type="button" className="cost-filter__clear-btn">
            Clear Filters
          </button>

          <button
            type="button"
            className="cost-filter__apply-btn"
            onClick={() => ApplyFilter()}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostForTwo;
