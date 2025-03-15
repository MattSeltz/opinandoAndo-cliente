"use server";

import { cookies } from "next/headers";

import { ENVIRONMENT } from "@/configs/configs";

export async function setUserCookie(userId: string) {
	const cookieStore = await cookies();
	cookieStore.set("userId", userId, {
		httpOnly: true,
		secure: ENVIRONMENT !== "http://localhost:3001/",
		path: "/",
		maxAge: 60 * 60 * 24 * 7,
	});
}
