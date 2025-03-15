import { cookies } from "next/headers";

import { getOneData } from "@/services/services";

import { PostComponent } from "@/components/post/PostComponent";
import { LinkComponent } from "@/components/profile/LinkComponent";
import { InfoComponent } from "@/components/profile/InfoComponent";

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
}

interface Props {
	id: string;
}

export default async function ProfileId({ params }: { params: Props }) {
	const cookieStore = await cookies();
	const miCookie = cookieStore.get("userId")?.value;

	const [, user] = await getOneData("users", params.id);

	return (
		<main className="p-4 flex flex-col gap-4">
			<h3 className="text-center text-lg">Perfil</h3>

			<h2 className="text-center text-lg font-bold">{user.username}</h2>

			<section className="flex flex-col gap-4 max-w-lg mx-auto w-full">
				<InfoComponent title="Email" info={user.email} />
				<InfoComponent
					title="Usuario Creado el"
					info={user.createdAt.split("T")[0]}
				/>
				<InfoComponent title="Fecha de Nacimiento" info={user.date} />
				<InfoComponent title="País" info={user.country} />
				<InfoComponent title="Sexo" info={user.sex} />
			</section>

			{miCookie === params.id && (
				<>
					<h3 className="text-center text-lg">Analiticas</h3>

					<section className="flex flex-col gap-2 max-w-lg mx-auto w-full">
						<LinkComponent title="desacuerdo" id={miCookie} />
						<LinkComponent title="acuerdo" id={miCookie} />
					</section>
				</>
			)}

			<ul className="flex flex-col gap-6 max-w-lg mx-auto">
				{user.posts.map((post: Post) => (
					<PostComponent
						key={post._id}
						author={post.author.username}
						date={post.date}
						title={post.title}
						body={post.body}
						authorId={post.author._id}
					/>
				))}
			</ul>
		</main>
	);
}
