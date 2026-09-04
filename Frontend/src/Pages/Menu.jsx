// import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { getstate } from "../services/State";
import "../Style/Menu.css";
// import { FoodsContext } from "../Context/FoodsContext/FoodContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigation = useNavigate();
  const [state, setState] = useState([]);
  const [page, setPage] = useState(0);
  console.log(page);

  // console.log("items", item);
  let limit = 4;

  async function getStates() {
    try {
      let response = await getstate(page, limit);
      setState(response.data.states);
      setPage(response.data.page);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStates();
  }, [page]);

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
              onClick={() => navigation(`/foodsCart/${element._id}`)}
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
