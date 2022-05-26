import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import Login from "./components/Login";
import Home from "./components/Home";
  
export default () => 
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes> 
  </BrowserRouter>
