import React from "react";

import About from "../Pages/About";
import Menu from "../Pages/Menu";

// const Menu = lazy(() => import("../Pages/Menu"));
// const About = lazy(() => import("../Pages/About"));

const Home = () => {
  return (
    <div>
      <About />
      <Menu />
    </div>
  );
};

export default Home;
