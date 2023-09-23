import React, { useState, useEffect } from "react";
import SkyPlot from "./component/SkyPlot";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/getSkyPlot")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <SkyPlot data={data} mountPoint='PPGS' />
    </div>
  );
}

export default App;
