// const CostForTwo = lazy(() => import("../Pages/CostForTwo"));
// const VegNonVeg = lazy(() => import("../Pages/VegNonVeg"));
// const Filter = lazy(() => import("../Pages/Filter"));
// const Rating = lazy(() => import("../Pages/Rating"));
// const SortBy = lazy(() => import("../Pages/SortBy"));

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStatefood } from "../services/Statefood";
import "../Style/FoodCart.css";
import CostForTwo from "../Pages/CostForTwo";

const FoodsCart = () => {
  const { _id } = useParams();
  const navigation = useNavigate();
  const [statefood, setStatefood] = useState([]);
  console.log(statefood);
  const [costfortwo, setCostForTwo] = useState(false);
  const [forditem, setfoodItem] = useState([]);

  const result = statefood?.data?.foods.filter((item) => {
    return item.stateid === _id;
  });

  useEffect(() => {
    async function getStateFood() {
      try {
        let response = await getStatefood();

        setStatefood(response);

        setfoodItem(result);
      } catch (error) {
        console.log(error);
      }
    }
    getStateFood();
  }, [result]);

  // useEffect(() => {
  //   function xyz() {
  //     setfoodItem(result);
  //   }
  //   xyz();
  // }, [result]);

  return (
    <section className="foods-container">
      {/* Modals */}

      {/* {sortBy && (
        <SortBy
          setSortBy={setSortBy}
          SelectedFood={SelectedFood}
          setFilterFood={setFilterFood}
        />
      )} */}

      {/* {rating && (
        <Rating
          setRating={setRating}
          SelectedFood={SelectedFood}
          setFilterFood={setFilterFood}
        />
      )} */}

      {/* {allFilter && <Filter setallfilter={setallfilter} />} */}

      {/* {cost && (
        <CostForTwo
          setCost={setCost}
          SelectedFood={SelectedFood}
          setFilterFood={setFilterFood}
        />
      )} */}

      {costfortwo && (
        <CostForTwo setCostForTwo={setCostForTwo} result={result} />
      )}
      {/* Header */}

      <div className="foods-header">
        <p>
          Explore a wide variety of Bihar state Food to satisfy your craving
        </p>
      </div>

      {/* Filter Buttons */}

      <div className="filter-btns">
        {/* <button onClick={handleallfilter}>Filter</button>

        <button onClick={handleSort}>Sort By</button>

        <button onClick={handleRating}>Rating</button>

        <button onClick={handleCategory}>Veg/Non-Veg</button> */}

        {/* <button onClick={() => handleCostForTwo}>Cost for Two</button> */}
        <button onClick={() => setCostForTwo((prev) => (prev ? false : true))}>
          Cost for Two
        </button>
      </div>

      <h2 className="title">Restaurants to Explore</h2>

      {/* Food List */}

      <div className="foods-grid">
        {forditem?.map((food) => (
          <div className="food-card" key={food._id}>
            <img src={food.image} alt={food.foodname} className="food-image" />

            <div className="food-info">
              <h3>{food.foodname}</h3>

              <p className="price">₹{food.price}</p>

              <p className="rating">⭐{food.rating} </p>

              <p className="desc">{food.description}</p>

              <button
                className="border-2"
                onClick={() => navigation(`/foodCart/${food._id}`)}
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
