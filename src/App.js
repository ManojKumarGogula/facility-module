import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routesConfig";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "./app.css";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
};

export default App;
