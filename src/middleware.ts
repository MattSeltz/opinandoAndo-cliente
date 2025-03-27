import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	console.log("Middleware cookies:", req.cookies.getAll());
	return NextResponse.next();
}
