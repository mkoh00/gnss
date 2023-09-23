const express = require("express");
const cors = require("cors");
const { GET_SNR_DATA, GET_SATOBS_DATA, GET_SKY_PLOT } = require("./routes");
const { getSnrDataHandler, getSatobsDataHandler, getSkyPlotHandler } = require("./handlers");

const app = express();

app.use(cors());

app.get(GET_SNR_DATA, getSnrDataHandler);
app.get(GET_SATOBS_DATA, getSatobsDataHandler);
app.get(GET_SKY_PLOT, getSkyPlotHandler);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
