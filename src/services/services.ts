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

interface To {
	to?: string;
	id?: string;
}

interface Password {
	password: string;
}

export const getData = async (path: string) => {
	try {
		const res = await fetch(`${ENVIRONMENT}api/${path}`, {
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
		const res = await fetch(`${ENVIRONMENT}api/${path}/${id}`, {
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

export const postData = async (
	path: string,
	body: User | Post | undefined | To
) => {
	try {
		const res = await fetch(`${ENVIRONMENT}api/${path}`, {
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
	body: User | Post | PostId | Vote | Password
) => {
	try {
		const res = await fetch(`${ENVIRONMENT}api/${path}/${id}`, {
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
		const res = await fetch(`${ENVIRONMENT}api/${path}/${id}`, {
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
