import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./db/schema.ts", // 表结构定义文件路径
  out: "./drizzle", // 迁移文件的输出目录
  dialect: "mysql", // 数据库类型
  dbCredentials: {
    host: process.env.DB_HOST || "", // MySQL 主机地址
    port: Number(process.env.DB_PORT) || 3306, // MySQL 端口
    user: process.env.DB_USER || "", // MySQL 用户名
    password: process.env.DB_PASSWORD || "", // MySQL 密码
    database: process.env.DB_NAME || "", // 数据库名称
  },
});
