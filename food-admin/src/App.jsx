import { createBrowserRouter, RouterProvider } from "react-router-dom";
import State from "./pages/State";
import Statefood from "./pages/Statefood";
import StatefoodItem from "./pages/StatefoodItem";
import SignIn from "./pages/SignIn";
import Registation from "./pages/Registation";
import Order from "./pages/Order";
import PageLayout from "./layout/PageLayout";
import ProtectRoute from "./protectRoute/ProtectRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,
      children: [
        {
          path: "/signIn",
          element: <SignIn />,
        },
        {
          path: "/registation",
          element: <Registation />,
        },
        {
          element: <ProtectRoute />,
          children: [
            {
              path: "/state",
              element: <State />,
            },
            {
              path: "/Statefood",
              element: <Statefood />,
            },
            {
              path: "/StatefoodItem",
              element: <StatefoodItem />,
            },
          ],
        },
        {
          path: "/order",
          element: <Order />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
