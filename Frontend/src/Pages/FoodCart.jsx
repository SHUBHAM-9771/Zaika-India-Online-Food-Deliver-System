import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FoodsContext } from "../Context/FoodsContext/FoodContext";
import { CartContext } from "../Context/CartContext/CartContext";
import "../Style/Carts.css";

const FoodCart = () => {
  const food = useContext(FoodsContext);
  // Cart Context
  const { item, setItem } = useContext(CartContext);

  const { state, foods } = useParams();

  const [selectedfood, setSelectedfood] = useState([]);
  const [itemfilter, setitemFilter] = useState("");
  const [category, setCategory] = useState([]);

  // =========================
  // Find State
  // =========================

  const result = useMemo(() => {
    return food?.find((item) => item.state === state);
  }, [food, state]);

  // =========================
  // Find Food
  // =========================

  const result1 = useMemo(() => {
    return result?.foods?.filter((item) => item.name === foods);
  }, [result, foods]);

  // =========================
  // Get Food Data
  // =========================

  const data = result1?.[0];

  // =========================
  // Get Food Items
  // =========================

  const items = result1?.[0]?.items || [];

  // =========================
  // Store Food Items
  // =========================

  useEffect(() => {
    setSelectedfood(items);
  }, [items]);

  // =========================
  // Filter Food
  // =========================

  const filterdata = useMemo(() => {
    if (itemfilter === "") {
      return selectedfood;
    }

    return selectedfood.filter(
      (item) => item.foodType === itemfilter || item.bestsellers === itemfilter,
    );
  }, [selectedfood, itemfilter]);

  // =========================
  // Update Category
  // =========================

  useEffect(() => {
    setCategory(filterdata);
  }, [filterdata]);

  console.log("filterdata =", filterdata);
  console.log("category =", category);

  function itemsadd(foodItem) {
    let alreadyExist = item.find((ele) => {
      return ele.id === foodItem.id;
    });

    if (alreadyExist) {
      return;
    }
    setItem((prev) => [
      ...prev,
      {
        ...foodItem,
        quantity: 1,
      },
    ]);
  }

  return (
    <div className="food-box">
      {/* Header */}

      <div className="food-header">
        <h2>Food Box</h2>

        <img src={data?.img} alt={data?.state} />

        <div className="rating">⭐ 4.5</div>
      </div>

      {/* Search */}
      <div className="food-search">
        <input type="text" name="search" placeholder="Search food..." />

        <span className="search-icon">⌕</span>
      </div>

      {/* Filter Buttons */}
      <div className="food-filter-buttons">
        <button
          className="food-filterbtn"
          onClick={() => setitemFilter("nonveg")}
        >
          Non Veg
        </button>

        <button className="food-filterbtn" onClick={() => setitemFilter("veg")}>
          Pure Veg
        </button>

        <button className="food-filterbtn" onClick={() => setitemFilter("")}>
          All
        </button>

        <button
          className="food-filterbtn"
          onClick={() => setitemFilter("best")}
        >
          Best Sellers
        </button>
      </div>

      <hr />

      {/* Food List */}

      <div className="food-list">
        {category.map((item) => (
          <div className="food-card" key={item.id}>
            {/* Food Details */}

            <div className="food-details">
              <h3>{item.name}</h3>

              <p>Price: ₹{item.price}</p>

              <p>Rating: ⭐ {item.rating}</p>

              <p>Description: {item.description}</p>

              <p>Weight: {item.weight || "N/A"}</p>
            </div>

            {/* Food Image */}

            <div className="food-image-container">
              <img src={item.img} alt={item.name} className="food-image" />

              <button className="add-btn" onClick={() => itemsadd(item)}>
                ADD
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCart;
