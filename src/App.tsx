import React, { useState, useEffect } from "react";
import DataTable from "./component/SnrDataBoard";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getData")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <DataTable data={data} itemsPerPage={16} />
    </div>
  );
}

export default App;
