import {
  mysqlTable,
  serial,
  varchar,
  int,
  datetime,
} from "drizzle-orm/mysql-core";

export const records = mysqlTable("records", {
  id: serial("id").primaryKey(), // 自增主键
  type: varchar("type", { length: 255 }), // 为 varchar 指定长度
  tag: varchar("tag", { length: 255 }), // 为 varchar 指定长度
  date: datetime("date"),
  money: int("money"), // 数值字段
});
