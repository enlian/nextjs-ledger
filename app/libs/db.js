import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : 5432,
  ssl: {
    rejectUnauthorized: false, // 使用 SSL，但不验证自签名证书
  },
});

pool.on("error", (err) => {
  console.error("数据库错误", err);
});

export const query = async (text, params) => {
  try {
    return await pool.query(text, params);
  } catch (error) {
    console.error("数据库query error", error);
    throw error;
  }
};
