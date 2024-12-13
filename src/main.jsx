import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";
// import { fetchUser } from "./redux/action.js";
import { Provider } from "react-redux";

// console.log("Initial state: ", store.getState());

// store
//   .dispatch(fetchUser())
//   .then(() =>
//     console.log("Update state: ", store.getState())
//   )
//   .catch((e) => console.log("Error:", e));

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>{" "}
  </Provider>
);
