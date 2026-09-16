import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getStatefoodItem } from "../services/FoodItem";
import "../Style/Carts.css";
import { CartContext } from "../Context/CartContext/CartContext";

const FoodCart = () => {
  const { item, setItem } = useContext(CartContext);
  console.log(item);
  const { _id } = useParams();
  const [foodItem, setFoodItem] = useState([]);
  const [filterFood, setFilterFood] = useState([]);
  console.log(filterFood);
  const [isClicked, setisClicked] = useState(null);

  useEffect(() => {
    async function getFoodItem() {
      try {
        let response = await getStatefoodItem();
        setFoodItem(response);
      } catch (error) {
        console.log(error);
      }
    }
    getFoodItem();
  }, []);

  let selectedFoodItem = foodItem?.data?.foodItem.filter((item) => {
    return item.foodId === _id;
  });
  //Automatically show all items
  useEffect(() => {
    setFilterFood(selectedFoodItem);
  }, [foodItem, _id]);

  function handlePureveg(foodTypes) {
    let result = selectedFoodItem.filter((item) => {
      return item.itemTypes === foodTypes;
    });
    setFilterFood(result);
  }

  function handleNonVeg(foodTypes) {
    let result = selectedFoodItem.filter((item) => {
      return item.itemTypes === foodTypes;
    });

    setFilterFood(result);
  }

  function handleALL() {
    setFilterFood(selectedFoodItem);
  }

  //
  function itemsadd(foodItem) {
    console.log(isClicked);
    setItem((prev) => {
      let result = prev.find((item) => {
        return item._id === foodItem._id;
      });

      if (!result) {
        let newItem = {
          ...foodItem,
          quantity: foodItem.quantity + 1,
        };
        return [...prev, newItem];
      }
      return prev;
    });

    setisClicked(foodItem._id);
  }
  return (
    <div className="food-box">
      {/* Header */}

      <div className="food-header">
        <h2>Food Box</h2>

        {/* <img src="" alt="" /> */}

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
          onClick={() => handleNonVeg("nonveg")}
        >
          Non Veg
        </button>

        <button className="food-filterbtn" onClick={() => handlePureveg("veg")}>
          Pure Veg
        </button>

        <button className="food-filterbtn" onClick={() => handleALL("")}>
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
        {filterFood?.map((item) => (
          <div className="food-card" key={item._id}>
            {/* Food Details */}

            <div className="food-details">
              <h3>{item.foodname}</h3>

              <p>Price: ₹{item.price}</p>

              <p>Rating: ⭐ {item.rating}</p>

              <p>Description: {item.description}</p>

              <p>Weight: {item.weight || "N/A"}</p>
            </div>

            {/* Food Image */}

            <div className="food-image-container">
              <img
                src={item.image}
                alt={item.foodname}
                className="food-image"
              />

              <button
                className="add-btn"
                onClick={() => itemsadd(item)}
                disabled={isClicked === item._id}
              >
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
