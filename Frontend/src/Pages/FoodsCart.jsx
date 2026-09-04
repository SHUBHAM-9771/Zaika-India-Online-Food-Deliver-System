// const CostForTwo = lazy(() => import("../Pages/CostForTwo"));
// const VegNonVeg = lazy(() => import("../Pages/VegNonVeg"));
// const Filter = lazy(() => import("../Pages/Filter"));
// const Rating = lazy(() => import("../Pages/Rating"));
// const SortBy = lazy(() => import("../Pages/SortBy"));

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStatefood } from "../services/Statefood";
import "../Style/FoodCart.css";

const FoodsCart = () => {
  const { _id } = useParams();
  const navigation = useNavigate();
  const [statefood, setStatefood] = useState([]);

  const result = statefood?.data?.foods.filter((item) => {
    return item.stateid === _id;
  });

  useEffect(() => {
    async function getStateFood() {
      try {
        let response = await getStatefood();
        setStatefood(response);
      } catch (error) {
        console.log(error);
      }
    }
    getStateFood();
  }, []);

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

      {/* {category && (
        <VegNonVeg
          setCategory={setCategory}
          SelectedFood={SelectedFood}
          setFilterFood={setFilterFood}
        />
      )} */}

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

        <button onClick={handleCategory}>Veg/Non-Veg</button>

        <button onClick={handleCost}>Cost for Two</button> */}
      </div>

      <h2 className="title">Restaurants to Explore</h2>

      {/* Food List */}

      <div className="foods-grid">
        {result?.map((food) => (
          <div className="food-card" key={food._id}>
            <img src="" alt="" className="food-image" />

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
