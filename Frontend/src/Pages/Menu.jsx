// import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import "../Style/Menu.css";
import { FoodsContext } from "../Context/FoodsContext/FoodContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigation = useNavigate();
  const { state, page, setPage } = useContext(FoodsContext);
  console.log(state);

  // let limit = 4;
  // const [skip, setSkip] = useState(0);

  // const result = food.slice(skip, skip + limit);

  function handleNext() {
    setPage((prev) => {
      return prev + 1;
    });
  }

  function handleback() {
    // setSkip(skip === 0 ? 0 : skip - limit);
    setPage((prev) => {
      return prev - 1;
    });
  }

  return (
    <section className="menu-container">
      <h1 className="heading">Zaika India – Royal Taste of All States</h1>

      <div className="menu-grid">
        {state?.map((element) => (
          <article className="menu-card" key={element._id}>
            <img
              src={element.image}
              alt={element.state}
              className="menu-image"
            />

            <button
              className="show-btn"
              onClick={() => navigation(`/foodsCart/${element.state}`)}
            >
              {element.state}
            </button>
          </article>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handleback}>Back</button>

        <button onClick={handleNext}>Next</button>
      </div>
    </section>
  );
};

export default Menu;
