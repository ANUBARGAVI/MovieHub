
// import { createRoot } from 'react-dom/client'
// // import './index.css'
// import App from './App.jsx'
// import {BrowserRouter} from "react-router-dom";
// createRoot(document.getElementById('root')).render(

//   <BrowserRouter>
//   <App/>
//   </BrowserRouter>

// );

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
