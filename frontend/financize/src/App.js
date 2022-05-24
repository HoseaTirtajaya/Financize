import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import AllRoutes from "./routes";

export default () => 
  <Provider store={store}>
    <AllRoutes/>
  </Provider>
