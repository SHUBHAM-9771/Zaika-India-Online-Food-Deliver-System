import React, { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { Children } from "react";

// Step 2
// Create a ThemeProvider component.
// This component manages the global theme state.
// It shares the theme data with multiple child components
// using ThemeContext.Provider.

const ThemeProvider = ({ children }) => {
  // console.log(children.type.name);
  // console.log(Children.count(children));
  const items = Children.toArray(children);

  // console.log(items);

  //   step 3
  // we use useState to store the theme state,
  // this state will shared with multiple child components through ThemeContext.provide
  const [theme, setTheme] = useState("light");
  // console.log(theme);
  return (
    // Step 4
    // ThemeContext.Provider is a built-in React component.
    // It shares the context data with all child components.
    // with all child components wrapped inside it.
    // The value prop is used to provide (share) context data.
    // Here we are sharing the theme state and setTheme function.
    // Any child component inside this Provider can access them using useContext().
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
