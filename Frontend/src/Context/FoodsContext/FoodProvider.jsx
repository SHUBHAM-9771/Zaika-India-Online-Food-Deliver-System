import { useEffect, useState } from "react";
import { FoodsContext } from "./FoodContext";
// import FoodData from "../../Data/FoodData.json";
import axios from "axios";

const FoodProvider = ({ children }) => {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(0);
  console.log(page);

  // console.log("items", item);

  async function getStates() {
    try {
      let response = await axios.get(
        `http://localhost:9000/getAllState?page=${page}&limit=4`,
      );
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

  return (
    <FoodsContext.Provider value={{ state, setState, page, setPage }}>
      {children}
    </FoodsContext.Provider>
  );
};

export default FoodProvider;
