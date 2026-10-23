import { lazy, Suspense, useContext } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import "./index.css";
import ProtectRoute from "./ProtectRoute/ProtectRoute.jsx";
import Payment from "./Pages/Payment.jsx";

// Lazy Loaded Components
const Home = lazy(() => import("./Pages/Home"));
const FoodsCart = lazy(() => import("./Pages/FoodsCart"));

const Footer = lazy(() => import("./Components/Footer.jsx"));

const PageLayout = lazy(() => import("./Layout/PageLayout"));

const Search = lazy(() => import("./Pages/Search"));

const Offers = lazy(() => import("./Pages/Offers.jsx"));

const FoodCart = lazy(() => import("./Pages/FoodCart.jsx"));

const Address = lazy(() => import("./Pages/Address.jsx"));

const AddToCart = lazy(() => import("./Pages/AddToCart.jsx"));

const Order = lazy(() => import("./Pages/Order.jsx"));

function App() {
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
          path: "/foodsCart/:_id",
          element: <FoodsCart />,
        },

        {
          path: "/foodCart/:_id",
          element: <FoodCart />,
        },
        {
          path: "/footer",
          element: <Footer />,
        },

        {
          element: <ProtectRoute />,
          children: [
            {
              path: "AddtoCart",
              element: <AddToCart />,
            },
            {
              path: "address",
              element: <Address />,
            },
            {
              path: "payment",
              element: <Payment />,
            },
            {
              path: "order",
              element: <Order />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div>
      <Suspense fallback={<h2>Loading...</h2>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
