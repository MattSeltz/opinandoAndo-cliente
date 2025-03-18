import { cookies } from "next/headers";
import Link from "next/link";

import { getData } from "@/services/services";

import { PostComponent } from "@/components/post/PostComponent";

interface Author {
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
interface Post {
	_id: string;
	author: Author;
	date: string;
	title: string;
	body: string;
	acuerdo: Author[];
	desacuerdo: Author[];
}

export default async function Home() {
	const cookieStore = await cookies();
	const miCookie = cookieStore.get("token");
	const id = cookieStore.get("userId")?.value;

	const [, posts] = await getData("posts");

	return (
		<main className="p-4 flex flex-col gap-4">
			<div className="flex flex-col justify-center gap-4">
				<h3 className="text-center text-lg">Posts</h3>
				{miCookie && (
					<Link
						href={"/add"}
						type="button"
						className="bg-blue-500 text-white rounded p-2 shadow text-center max-w-lg mx-auto w-full cursor-pointer transition-colors hover:bg-blue-600"
					>
						Añadir Post
					</Link>
				)}
			</div>

			<ul className="flex flex-col gap-6 max-w-lg mx-auto w-full">
				{posts.reverse().map((post: Post) => (
					<PostComponent
						key={post._id}
						author={post.author.username}
						date={post.date}
						title={post.title}
						body={post.body}
						authorId={post.author._id}
						profile={false}
						id={post._id}
						acuerdo={post.acuerdo.some((item) => item._id === id)}
						desacuerdo={post.desacuerdo.some((item) => item._id === id)}
					/>
				))}
			</ul>
		</main>
	);
}
