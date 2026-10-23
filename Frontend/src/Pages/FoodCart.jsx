import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Style/Carts.css";
import { getStatefoodItem } from "../services/FoodItem";

const FoodCart = () => {
  const { _id } = useParams();
  const [item, setItem] = useState([]);
  const [allItems, setAllItems] = useState([]);

  function getfoodItemsTypes(itemtypes) {
    return function () {
      if (itemtypes === "all" || itemtypes === "best") {
        return allItems;
      } else {
        return allItems.filter((food) => {
          return food.itemTypes === itemtypes;
        });
      }
    };
  }

  function handleItems(itemtypes) {
    console.log(itemtypes);
    const filterfunction = getfoodItemsTypes(itemtypes);

    // Returned function ko call karna zaroori hai
    const filteredItems = filterfunction();
    setItem(filteredItems);
  }

  async function getfoodItem() {
    try {
      let response = await getStatefoodItem();
      console.log(response);

      let foodItem = response?.data?.foodItem;

      let result = foodItem.filter((item) => {
        return item.foodId?._id?.toString() === _id;
      });
      setItem(result);
      setAllItems(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getfoodItem();
  }, []);

  function addfoodItems(item) {
    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let exist = cart.find((items) => {
        return items._id === item._id;
      });

      if (!exist) {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        alert("This items all ready store in localstorage");
      }
    } catch (error) {
      console.error("Error adding food item :", error);
    }
  }
  return (
    <div className="food-box">
      {/* Header */}

      <div className="food-header">
        <h2>Food Box</h2>

        {item.length > 0 && item[0].foodId?.image && (
          <img
            src={`http://localhost:9000/uploads/${item[1].foodId.image}`}
            alt={item[0].foodId.foodname || "State food"}
            className="statefood-image"
          />
        )}

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
          onClick={() => handleItems("nonveg")}
        >
          Non Veg
        </button>

        <button className="food-filterbtn" onClick={() => handleItems("veg")}>
          Pure Veg
        </button>

        <button className="food-filterbtn" onClick={() => handleItems("all")}>
          All
        </button>

        <button className="food-filterbtn" onClick={() => handleItems("best")}>
          Best Sellers
        </button>
      </div>

      <hr />

      {/* Food List */}

      <div className="food-list">
        {item?.map((items) => (
          <div className="food-card" key={items._id}>
            {/* Food Details */}

            <div className="food-details">
              <h3>{items.foodname}</h3>

              <p>Price: {items.price} </p>

              <p>Rating:{items.rating} ⭐ </p>

              <p>Description: </p>
            </div>

            {/* Food Image */}

            <div className="food-image-container">
              <img
                src={`http://localhost:9000/uploads/${items.image}`}
                alt={items.foodname}
                onError={(e) => {
                  console.log("Image URL:", e.currentTarget.src);
                }}
                className="food-image"
              />

              <button className="add-btn" onClick={() => addfoodItems(items)}>
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
