import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import State from "./pages/State";
import StateFood from "./pages/StateFood";
import FoodItem from "./pages/FoodItem";
import PageLayout from "./Layout/PageLayout";
import ListItem from "./pages/ListItem";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        {
          path: "state",
          element: <State />,
        },
        {
          path: "state-food",
          element: <StateFood />,
        },

        {
          path: "state-food-item",
          element: <FoodItem />,
        },

        {
          path: "listItems",
          element: <ListItem />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
