import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContectPRovider from "./context/AuthContectPRovider.jsx";
import TheamProvider from "./context/TheamProvider.jsx";

createRoot(document.getElementById("root")).render(
  <TheamProvider>
    <AuthContectPRovider>
      <App />
    </AuthContectPRovider>
  </TheamProvider>,
);
