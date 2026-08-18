import React, { useState } from "react";
import "../Style/Category.css";

const VegNonVeg = ({ setCategory, SelectedFood, setFilterFood }) => {
  const [FoodType, setFoodType] = useState({
    nonveg: false,
    veg: false,
  });

  // console.log("SelectedFood", SelectedFood);

  function handlefoodItem(e) {
    const { name, checked } = e.target;

    console.log("name", name);
    console.log("checked", checked);

    setFoodType({
      ...FoodType,
      [name]: checked,
    });
  }

  function createCategoryfilter(FoodType) {
    return function (item) {
      const { nonveg, veg } = FoodType;

      if (!nonveg && !veg) {
        return true;
      }
      return (
        (nonveg && item.foodType === "nonveg") ||
        (veg && item.foodType === "veg")
      );
    };
  }

  function handleApply() {
    const data = [...SelectedFood.foods];
    console.log(data);
    const CategoryFood = data.filter(createCategoryfilter(FoodType));
    console.log(CategoryFood);
    setFilterFood(CategoryFood);
    setCategory(false);
  }

  function handlecleanitem() {
    const data = [...SelectedFood.foods];
    setFoodType({
      nonveg: false,
      veg: false,
    });
    setFilterFood(data);
    setCategory(false);
  }

  // function handleApply() {
  //   // console.log("Apply fn");
  //   const data = [...SelectedFood.foods];
  //   console.log(data);
  //   let filderfoodType = null;

  //   if (FoodType.nonveg) {
  //     filderfoodType = data.filter((item) => {
  //       return item.foodType.includes("nonveg");
  //     });
  //   }
  //   if (FoodType.pureveg) {
  //     filterfoodType = data.filter((item) => {
  //       return item.foodType.includes("pureveg");
  //     });
  //   }
  //   console.log(filderfoodType);
  //   setFilterFood(filderfoodType);
  //   setCategory(false);
  // }
  return (
    // Parent Section
    <section className="veg-filter">
      {/* Overlay */}
      <div className="veg-filter__overlay">
        {/* Modal */}
        <div className="veg-filter__modal">
          {/* Header */}
          <div className="veg-filter__header">
            <h3 className="veg-filter__title">Veg / Non-Veg</h3>

            <button
              onClick={() => setCategory(false)}
              className="veg-filter__close-btn"
              type="button"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="veg-filter__body">
            <div className="veg-filter__option">
              <label htmlFor="nonVeg">
                <input
                  type="checkbox"
                  name="nonveg"
                  id="nonVeg"
                  checked={FoodType.nonveg}
                  onChange={handlefoodItem}
                />
                &nbsp;Non Veg
              </label>
            </div>

            <div className="veg-filter__option">
              <label htmlFor="pureVeg">
                <input
                  type="checkbox"
                  id="pureVeg"
                  name="veg"
                  checked={FoodType.veg}
                  onChange={handlefoodItem}
                />
                &nbsp;Pure Veg
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="veg-filter__footer">
            <button
              onClick={handlecleanitem}
              className="veg-filter__btn"
              type="button"
            >
              Clear Filter
            </button>

            <button
              onClick={handleApply}
              className="veg-filter__btn"
              type="button"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VegNonVeg;
