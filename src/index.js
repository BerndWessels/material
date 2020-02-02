/**
 * Dependencies
 */
import React from "react";
import ReactDOM from "react-dom";

/**
 * AWS Amplify
 */
import './amplify';

/**
 * Components
 */
import Root from "./components/root/root";

/**
 * Entry point
 */
ReactDOM.render(<Root />, document.getElementById("root"));
