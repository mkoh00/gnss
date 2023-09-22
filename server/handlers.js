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

const getDataHandler = async (req, res) => {
  try {
    const { rows } = await pool.query(QUERIES.GET_ALL_DATA);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("서버 에러");
  }
};

module.exports = {
  getDataHandler,
};
