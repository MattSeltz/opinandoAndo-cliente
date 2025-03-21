export interface Author {
	_id: string;
	username: string;
	password: string;
	email: string;
	date: string;
	sex: string;
	country: string;
	posts: string[];
	createdAt: string;
	updatedAt: string;
}

export interface Post {
	_id: string;
	author: Author;
	date: string;
	title: string;
	body: string;
	acuerdo: Author[];
	desacuerdo: Author[];
}
