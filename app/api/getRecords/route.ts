import { NextResponse } from "next/server";
import { query } from "./../../libs/db.js";

export async function GET() {
  return query(`select * from records`)
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
