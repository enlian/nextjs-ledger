import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// 加载 .env 文件中的环境变量
dotenv.config();

// 创建 MySQL 连接池
const pool = mysql.createPool({
  uri: process.env.MYSQL_URL, // 数据库连接字符串从 .env 加载
});

// 使用 Drizzle 连接数据库
const db = drizzle(pool);

export default db;
