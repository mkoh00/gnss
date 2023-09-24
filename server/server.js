const express = require("express");
const cors = require("cors");
const { GET_SNR_DATA, GET_SATOBS_DATA, GET_SKY_PLOT_DATA, GET_MOUNT_POINTS } = require("./routes");
const { getSnrDataHandler, getSatobsDataHandler, getSkyPlotDataHandler, getMounPointsHandler } = require("./handlers");

const app = express();

app.use(cors());

app.get(GET_SNR_DATA, getSnrDataHandler);
app.get(GET_SATOBS_DATA, getSatobsDataHandler);
app.get(GET_SKY_PLOT_DATA, getSkyPlotDataHandler);
app.get(GET_MOUNT_POINTS, getMounPointsHandler);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
