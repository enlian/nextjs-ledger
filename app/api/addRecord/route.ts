import { NextResponse } from "next/server";
import db from "../../../db/index";
import { records } from "../../../db/schema";

export async function POST(request: { json: () => any }) {
  try {
    const { type, tag, date, money } = await request.json();
    const result = await db
      .insert(records)
      .values({
        type,
        tag,
        date,
        money,
      })
      .$returningId();

    return NextResponse.json({
      status: "success",
      data: result[0],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
