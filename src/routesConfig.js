import React from "react";
import { createBrowserRouter } from "react-router-dom";

import HomePage from "./App/pages/homePage";
import Register from "./app/pages/register";
const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "register",
    element: <Register />,
  },
];
const router = createBrowserRouter(routes);

export default router;
