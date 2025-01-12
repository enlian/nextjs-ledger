import { NextResponse } from "next/server";
import db from "../../../db/index";
import { records } from "../../../db/schema";
import { and, gte, lte } from "drizzle-orm";

export async function POST(request: { json: () => any }) {
  try {
    const { year, month } = await request.json();

    let startDate, endDate;
    if (year && month) {
      startDate = new Date(`${year}-${month}-01`);
      endDate = new Date(`${year}-${month + 1}-01`);
    } else if (year) {
      startDate = new Date(`${year}-01-01`);
      endDate = new Date(`${year + 1}-01-01`);
    }

    //查询
    const result = await db
      .select()
      .from(records)
      .where(
        startDate && endDate
          ? and(gte(records.date, startDate.toISOString().split('T')[0]), lte(records.date, endDate.toISOString().split('T')[0]))
          : undefined
      );
    return NextResponse.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
