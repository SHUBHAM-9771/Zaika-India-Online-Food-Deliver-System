import { FoodsContext } from "./FoodContext";
import FoodData from "../../Data/FoodData.json";
import { useState } from "react";

const FoodProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  console.log("items", item);

  return (
    <FoodsContext.Provider value={FoodData}>{children}</FoodsContext.Provider>
  );
};

export default FoodProvider;
