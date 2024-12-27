import { NextResponse } from "next/server";
import { query } from "./../../libs/db.js";

export async function POST(request: { json: () => any }) {
  const { type, tag, date, money } = await request.json();

  return query(
    `insert into records (type,tag,date,money)
  values($1,$2,$3,$4)
  returning *;
  `,
    [type, tag, date, money]
  )
    .then((res) => {
      return NextResponse.json({ status: "success", data: res.rows[0] });
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
