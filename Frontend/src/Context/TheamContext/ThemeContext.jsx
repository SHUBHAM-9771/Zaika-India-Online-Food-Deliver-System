import { createContext } from "react";

// Step 1
// Import createContext from React.
// createContext is a built-in React function.
// We call the createContext() function.
// It creates a new Context object (an empty shared container).
// React automatically attaches Provider and Consumer to this Context object.
// The returned Context object is stored in the ThemeContext variable.
// Data will be shared later using ThemeContext.Provider.

export const ThemeContext = createContext();

// console.log(ThemeContext);
// console.log(ThemeContext.Provider);
// console.log(ThemeContext.Consumer);
