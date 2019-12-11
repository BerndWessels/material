// IE 11 Polyfills
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// Dependencies
import React from "react";
import ReactDOM from "react-dom";

// Components
import Root from "./components/root/root";

// Entry point
ReactDOM.render(<Root />, document.getElementById("root"));
