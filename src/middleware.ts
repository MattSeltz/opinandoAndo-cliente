import { NextResponse } from "next/server";

export function middleware() {
	const res = NextResponse.next();
	res.headers.set(
		"Access-Control-Allow-Origin",
		"https://xyz-servidor.onrender.com/"
	);
	res.headers.set("Access-Control-Allow-Credentials", "true");
	return res;
}
