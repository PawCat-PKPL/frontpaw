import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value || "";
  return NextResponse.json({ accessToken });
}
