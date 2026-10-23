import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStatefood } from "../services/Statefood";
import "../Style/FoodCart.css";
import CostForTwo from "../Pages/CostForTwo";
// import Filter from "../Pages/Filter";
import Rating from "../Pages/Rating";
import SortBy from "../Pages/SortBy";

const FoodsCart = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [statefood, setStatefood] = useState([]);

  const [costfortwo, setCostForTwo] = useState(false);
  // const [filter, setFilter] = useState(false);
  const [rating, setRating] = useState(false);
  const [sortBy, setSortBy] = useState(false);

  const [filteredFoods, setFilteredFoods] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStateFood() {
      try {
        const response = await getStatefood();

        if (!cancelled) {
          setStatefood(response);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch state foods:", error);
        }
      }
    }

    fetchStateFood();

    return () => {
      cancelled = true;
    };
  }, []);

  const result = useMemo(() => {
    return (statefood?.data?.foods ?? []).filter(
      (item) => item.stateid === _id,
    );
  }, [statefood, _id]);

  // Display original data until a filter is applied
  const displayedFoods = filteredFoods ?? result;
  return (
    <section className="foods-container">
      {costfortwo && (
        <CostForTwo
          setCostForTwo={setCostForTwo}
          result={result}
          setFilteredFoods={setFilteredFoods}
        />
      )}

      {/* {filter && (
        <Filter
          filter={filter}
          setFilter={setFilter}
          result={result}
          setFilteredFoods={setFilteredFoods}
        />
      )} */}
      {rating && (
        <Rating
          rating={rating}
          setRating={setRating}
          result={result}
          setFilteredFoods={setFilteredFoods}
        />
      )}
      {sortBy && (
        <SortBy
          sortBy={sortBy}
          setSortBy={setSortBy}
          result={result}
          setFilteredFoods={setFilteredFoods}
        />
      )}
      <div className="foods-header">
        <p>
          Explore a wide variety of Bihar state Food to satisfy your craving
        </p>
      </div>

      <div className="filter-btns1">
        {/* <div className="filter-btns">
          <button onClick={() => setFilter((prev) => !prev)}>Filter</button>
        </div> */}

        <div className="filter-btns">
          <button onClick={() => setSortBy((prev) => !prev)}>SortBy</button>
        </div>

        <div className="filter-btns">
          <button onClick={() => setRating((prev) => !prev)}>Rating</button>
        </div>

        <div className="filter-btns">
          <button onClick={() => setCostForTwo((prev) => !prev)}>
            Cost for Two
          </button>
        </div>
      </div>

      <h2 className="title">Restaurants to Explore</h2>

      <div className="foods-grid">
        {displayedFoods.map((food) => (
          <div className="food-card" key={food._id}>
            <img
              src={`http://localhost:9000/uploads/${food.image}`}
              alt={food.foodname}
              onError={(e) => {
                console.log("Image URL:", e.currentTarget.src);
              }}
              className="food-image"
            />

            <div className="food-info">
              <h3>{food.foodname}</h3>
              <p className="price">₹{food.price}</p>
              <p className="rating">⭐ {food.rating}</p>
              <p className="desc">{food.description}</p>

              <button
                className="border-2"
                onClick={() => navigate(`/foodCart/${food._id}`)}
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
