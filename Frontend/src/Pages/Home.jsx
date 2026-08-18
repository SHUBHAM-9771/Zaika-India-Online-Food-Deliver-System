import React, { lazy } from "react";

const Menu = lazy(() => import("../Pages/Menu"));
const About = lazy(() => import("../Pages/About"));

const Home = () => {
  return (
    <div>
      <About />
      <Menu />
    </div>
  );
};

export default Home;
