import { NextResponse } from "next/server";

export async function POST(request: { json: () => any }) {
  const data = await request.json();
  console.log(data);
  return NextResponse.json({ message: "successed", data: data });
}
