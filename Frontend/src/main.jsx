import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./Context/TheamContext/ThemeProvider.jsx";
import PopupProvider from "./Context/PopupContext/PopupProvider.jsx";
import { CartProvider } from "./Context/CartContext/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <ThemeProvider>
      <PopupProvider>
        <App />
      </PopupProvider>
    </ThemeProvider>
  </CartProvider>,
);
