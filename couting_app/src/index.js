import React from "react";
import ReactDom from "react-dom/client";
import App from "../../couting_app/src/App";
import "../../couting_app/src/style.css";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
