import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import PopupProvider from "./context/PopupProvider.jsx";

createRoot(document.getElementById("root")).render(
  <PopupProvider>
    <App />
  </PopupProvider>,
);
