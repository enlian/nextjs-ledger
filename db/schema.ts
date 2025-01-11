import { mysqlTable, serial, varchar, int, bigint } from "drizzle-orm/mysql-core";

export const records = mysqlTable("records", {
  id: serial("id").primaryKey(),  // 自增主键
  type: varchar("type", { length: 255 }),     // 为 varchar 指定长度
  tag: varchar("tag", { length: 255 }),       // 为 varchar 指定长度
  date: bigint("date", { mode: "number" }), // 时间戳字段，模式为数字
  money: int("money"),            // 数值字段
});
