import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./private";
import LoginPage from '../components/LoginPage';
import Home from '../components/Home';

class AllRoutes extends Component {
    render() {
      return (
        <>
          <Router>
            <Routes>
              <Route exact path="/" component={LoginPage} />
              <PrivateRoute path="/dashboard" component={Home} />
            </Routes>
          </Router>
        </>
      );
    }
  }

  export default AllRoutes;