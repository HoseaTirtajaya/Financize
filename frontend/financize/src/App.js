import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import store from "./store";
import Login from "./components/Login";
import Home from "./components/Home";

export default () => 
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes> 
  </BrowserRouter>
