const express = require("express");
const cors = require("cors");
const { GET_DATA } = require("./routes");
const { getDataHandler } = require("./handlers");

const app = express();

app.use(cors());

app.get(GET_DATA, getDataHandler);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
