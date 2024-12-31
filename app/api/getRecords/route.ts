import { NextResponse } from "next/server";
import { query } from "./../../libs/db.js";

export async function POST(request: { json: () => any }) {
  const { year, month } = await request.json();

  let conditions: string[] = [];
  let params: any[] = [];

  if (year) {
    conditions.push("TO_CHAR(TO_TIMESTAMP(date),'YYYY')=$1");
    params.push(String(year));
  }

  if (month) {
    conditions.push("TO_CHAR(TO_TIMESTAMP(date),'MM')=$2");
    params.push(String(month).padStart(2, "0"));
  }

  const whereClause =
    conditions.length > 0 ? `where ${conditions.join(" and ")}` : "";

  const sql = `select * from records ${whereClause}`;

  return query(sql, params)
    .then((res) => {
      console.log(res.rows);
      return NextResponse.json({ status: "success", data: res.rows });
    })
    .catch((error) => {
      console.error("Database error:", error);
      return NextResponse.json(
        {
          status: "error",
          error: error.message,
        },
        { status: 500 }
      );
    });
}
