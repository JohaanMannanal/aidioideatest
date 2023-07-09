import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

// Define the initial state
const initialState = {
  breadcrumbs: [],
  user: {},
  showAppBar: true,
};

// Define reducer function to handle state updates
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BREADCRUMBS":
      return { ...state, breadcrumbs: action.payload };
    case "APPEND_BREADCRUMB":
      return { ...state, breadcrumbs: [...state.breadcrumbs, action.payload] };
    case "POP_BREADCRUMB":
      return { ...state, breadcrumbs: state.breadcrumbs.slice(0, -1) };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_APP_BAR":
      return { ...state, showAppBar: action.payload };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

// Define a component that uses the Redux store
const App = () => {
  return (
    <Provider store={store}>
      {/* Your app components and routes go here */}
    </Provider>
  );
};

export default App;
