import { ENVIRONMENT } from "@/configs/configs";

interface User {
	username?: string;
	email: string;
	password?: string;
	date?: string;
	sex?: string;
	country?: string;
}

interface Post {
	title: string;
	body: string;
	date: string;
	author: string | null;
}

interface PostId {
	postId: string;
}

interface Vote {
	type: string;
	userId: string | null;
}

export const getData = async (path: string) => {
	try {
		const res = await fetch(`${ENVIRONMENT}${path}`, {
			method: "GET",
			credentials: "include",
		});

		const data = await res.json();

		return [res.ok, data];
	} catch (error) {
		console.error(error);
		return [false, null];
	}
};

export const getOneData = async (
	path: string,
	id: string | undefined | null
) => {
	try {
		const res = await fetch(`${ENVIRONMENT}${path}/${id}`, {
			method: "GET",
			credentials: "include",
		});

		const data = await res.json();

		return [res.ok, data];
	} catch (error) {
		console.error(error);
		return [false, null];
	}
};

export const postData = async (path: string, body: User | Post | undefined) => {
	try {
		const res = await fetch(`${ENVIRONMENT}${path}`, {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		return [res.ok, data];
	} catch (error) {
		console.error(error);
		return [false, null];
	}
};

export const putData = async (
	path: string,
	id: string | undefined | null,
	body: User | Post | PostId | Vote
) => {
	try {
		const res = await fetch(`${ENVIRONMENT}${path}/${id}`, {
			method: "PUT",
			credentials: "include",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		return [res.ok, data];
	} catch (error) {
		console.error(error);
		return [false, null];
	}
};

export const deleteData = async (path: string, id: string) => {
	try {
		const res = await fetch(`${ENVIRONMENT}${path}/${id}`, {
			method: "DELETE",
			credentials: "include",
		});

		const data = await res.json();

		return [res.ok, data];
	} catch (error) {
		console.error(error);
		return [false, null];
	}
};
