import React, { useState, useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router";

import DashBoard from "./component/DashBoard";
import SNR from "./component/SNR";
import SkyPlot from "./component/SkyPlot";
import "./App.css";
import SnrDataBoard from "./component/SnrDataBoard";
import ObservationDetail from "./component/ObservationDetail";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route
              path="/"
              element={<DashBoard mountPoint='PPGS' />}
            ></Route>
            <Route
              path="/snr"
              element={<SNR mountPoint='PPGS' />}
            ></Route>
            <Route
              path="/skyplot"
              element={<SkyPlot mountPoint='PPGS' />}
            ></Route>
            <Route
              path="/obs"
              element={<ObservationDetail mountPoint='PPGS' />}
            ></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
