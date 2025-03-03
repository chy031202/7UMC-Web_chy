import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
