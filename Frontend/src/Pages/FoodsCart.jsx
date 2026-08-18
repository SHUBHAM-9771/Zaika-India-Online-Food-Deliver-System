import React, { useContext, useEffect, useState, lazy } from "react";
import { FoodsContext } from "../Context/FoodsContext/FoodContext";
import { useNavigate, useParams } from "react-router-dom";

const CostForTwo = lazy(() => import("../Pages/CostForTwo"));
const VegNonVeg = lazy(() => import("../Pages/VegNonVeg"));
const Filter = lazy(() => import("../Pages/Filter"));
const Rating = lazy(() => import("../Pages/Rating"));
const SortBy = lazy(() => import("../Pages/SortBy"));

import "../Style/FoodCart.css";

const FoodsCart = () => {
  const [filterfood, setFilterFood] = useState([]);
  const [cost, setCost] = useState(false);
  const [category, setCategory] = useState(false);
  const [allFilter, setallfilter] = useState(false);
  const [rating, setRating] = useState(false);
  const [sortBy, setSortBy] = useState(false);

  const food = useContext(FoodsContext);
  const { state } = useParams();
  const navigation = useNavigate();

  // Find selected state
  const SelectedFood = food.find((item) =>
    item.state.toLowerCase().includes(state.toLowerCase()),
  );

  // Store selected state's food
  useEffect(() => {
    if (SelectedFood) {
      setFilterFood(SelectedFood.foods);
    }
  }, [SelectedFood]);

  // Filter handlers

  function handleSort() {
    setSortBy(!sortBy);
  }

  function handleallfilter() {
    setallfilter(!allFilter);
  }

  function handleCost() {
    setCost(!cost);
  }

  function handleCategory() {
    setCategory(!category);
  }

  function handleRating() {
    setRating(!rating);
  }

  return (
    <section className="foods-container">
      {/* Modals */}

      {sortBy && (
        <SortBy
          setSortBy={setSortBy}
          SelectedFood={SelectedFood}
          setFilterFood={setFilterFood}
        />
      )}

      {rating && (
        <Rating
          setRating={setRating}
          SelectedFood={SelectedFood}
          setFilterFood={setFilterFood}
        />
      )}

      {allFilter && <Filter setallfilter={setallfilter} />}

      {cost && (
        <CostForTwo
          setCost={setCost}
          SelectedFood={SelectedFood}
          setFilterFood={setFilterFood}
        />
      )}

      {category && (
        <VegNonVeg
          setCategory={setCategory}
          SelectedFood={SelectedFood}
          setFilterFood={setFilterFood}
        />
      )}

      {/* Header */}

      <div className="foods-header">
        <p>
          Explore a wide variety of Bihar state Food to satisfy your craving
        </p>
      </div>

      {/* Filter Buttons */}

      <div className="filter-btns">
        <button onClick={handleallfilter}>Filter</button>

        <button onClick={handleSort}>Sort By</button>

        <button onClick={handleRating}>Rating</button>

        <button onClick={handleCategory}>Veg/Non-Veg</button>

        <button onClick={handleCost}>Cost for Two</button>
      </div>

      <h2 className="title">Restaurants to Explore</h2>

      {/* Food List */}

      <div className="foods-grid">
        {filterfood?.map((item) => (
          <div className="food-card" key={item.id}>
            <img src={item.img} alt={item.name} className="food-image" />

            <div className="food-info">
              <h3>{item.name}</h3>

              <p className="price">
                ₹{item.price}
                <span>₹{item.originalPrice}</span>
              </p>

              <p className="rating">⭐ {item.rating}</p>

              <p className="desc">{item.description}</p>

              <button
                className="border-2"
                onClick={() =>
                  navigation(`/foodCart/${SelectedFood.state}/${item.name}`)
                }
              >
                Show items
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodsCart;
