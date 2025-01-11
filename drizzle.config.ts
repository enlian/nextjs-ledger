import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// 加载 .env 文件中的环境变量
dotenv.config();

export default defineConfig({
  schema: "./db/schema.ts", // 定义表结构的文件路径
  out: "./drizzle",         // 输出的迁移文件夹
  dialect: "mysql",         // 使用 MySQL 数据库
  dbCredentials: {
    url: process.env.MYSQL_URL!, // 数据库连接字符串
  },
});
