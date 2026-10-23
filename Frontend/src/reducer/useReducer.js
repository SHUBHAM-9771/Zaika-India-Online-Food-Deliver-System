export const cartReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT": {
      const existingItem = state.find((item) => {
        return item._id === action.payload;
      });

      if (existingItem) {
        return state.map((item) => {
          return item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }
    }

    case "DECREMENT": {
      const existingItem = state.find((item) => {
        return item._id === action.payload;
      });

      if (existingItem) {
        return state.map((item) => {
          return item._id === action.payload
            ? { ...item, quantity: item.quantity > 0 ? 1 : item.quantity - 1 }
            : item;
        });
      }
    }

    case "REMOVE_FROM_CART": {
      const existingItem = state.find((item) => {
        return item._id === action.payload;
      });

      if (existingItem) {
        return state.filter((item) => {
          return item._id !== action.payload;
        });
      }
    }

    default:
      return state;
  }
};
