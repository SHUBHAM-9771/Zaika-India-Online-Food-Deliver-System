import { lazy, Suspense, useContext } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeContext } from "./Context/TheamContext/ThemeContext";

import "./App.css";
import "./index.css";
const AddToCart = lazy(() => import("./Pages/AddToCart.jsx"));

// Lazy Loaded Components

const Home = lazy(() => import("./Pages/Home"));
const Menu = lazy(() => import("./Pages/Menu"));
const FoodsCart = lazy(() => import("./Pages/FoodsCart"));

const Footer = lazy(() => import("./Components/Footer.jsx"));

const PageLayout = lazy(() => import("./Layout/PageLayout"));

const SignUp = lazy(() => import("./Pages/SignUp"));

const Search = lazy(() => import("./Pages/Search"));

const Offers = lazy(() => import("./Pages/Offers.jsx"));

const FoodCart = lazy(() => import("./Pages/FoodCart.jsx"));

const Address = lazy(() => import("./Pages/Address.jsx"));

function App() {
  const { theme } = useContext(ThemeContext);

  const router = createBrowserRouter([
    {
      path: "/",

      element: <PageLayout />,

      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "/menu",
          element: <Search />,
        },

        {
          path: "/offers",
          element: <Offers />,
        },

        {
          path: "/foodsCart/:state",
          element: <FoodsCart />,
        },

        {
          path: "/foodCart/:state/:foods",
          element: <FoodCart />,
        },
        {
          path: "/AddToCart",
          element: <AddToCart />,
        },
        {
          path: "/address",
          element: <Address />,
        },

        {
          path: "/footer",
          element: <Footer />,
        },
      ],
    },
  ]);

  return (
    <div className={theme}>
      <Suspense fallback={<h2>Loading...</h2>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
