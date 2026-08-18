import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./Context/TheamContext/ThemeProvider.jsx";
import PopupProvider from "./Context/PopupContext/PopupProvider.jsx";
import FoodProvider from "./Context/FoodsContext/FoodProvider.jsx";
import CartProvider from "./Context/CartContext/CartProvider.jsx";
// import { FoodsData } from "../Data/FoodData.json";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <PopupProvider>
      <FoodProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FoodProvider>
    </PopupProvider>
  </ThemeProvider>,
);
