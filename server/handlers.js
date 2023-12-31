const { Pool } = require("pg");
const QUERIES = require("./queryMapper");
const dotenv = require("dotenv");

dotenv.config(); // env 파일 연결

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

const getSnrDataHandler = async (req, res) => {
  try {
    const { rows } = await pool.query(QUERIES.GET_SNR_DATA);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("서버 에러");
  }
};

const getSatobsDataHandler = async (req, res) => {
  try {
    const { rows } = await pool.query(QUERIES.GET_SATOBS_DATA);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("서버 에러");
  }
};

const getSkyPlotDataHandler = async (req, res) => {
  try {
    //console.log("mount point는 " + req.query.mount_point + " 입니다")
    const { rows } = await pool.query(QUERIES.GET_SKY_PLOT_DATA + "'" + req.query.mount_point + "'");
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("서버 에러");
  }
};

const getMounPointsHandler = async (req, res) => {
  try {
    const { rows } = await pool.query(QUERIES.GET_MOUNT_POINTS);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("서버 에러");
  }
};

module.exports = {
  getSnrDataHandler,
  getSatobsDataHandler,
  getSkyPlotDataHandler,
  getMounPointsHandler
};
