import { cookies, headers } from "next/headers";
import Link from "next/link";

import type { Post } from "@/types/interfaces";

import { getOneData } from "@/services/services";

import { PostComponent } from "@/components/post/PostComponent";
import { PorcentajeComponent } from "@/components/profile/PorcentajeComponent";
import { InfoComponent } from "@/components/profile/InfoComponent";

export default async function ProfileId(props: {
	params: Promise<{ id: string }>;
}) {
	const headersList = await headers();
	console.log("Cookies en SSR:", headersList.get("cookie"));

	const paramsId = await props.params;

	const cookieStore = await cookies();
	const id = cookieStore.get("userId")?.value;

	const [, user] = await getOneData("users", paramsId.id);

	const acuerdos = user.posts.flatMap((post: Post) => post.acuerdo);
	const desacuerdos = user.posts.flatMap((post: Post) => post.desacuerdo);

	const total = acuerdos.length + desacuerdos.length;
	const porcentajeAcuerdo = total > 0 ? (acuerdos.length / total) * 100 : 0;
	const porcentajeDesacuerdo =
		total > 0 ? (desacuerdos.length / total) * 100 : 0;

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

			{id === paramsId.id && (
				<Link
					href={`/edit/${paramsId.id}`}
					className="bg-blue-500 text-white rounded shadow p-2 transition-colors
					 text-center max-w-lg mx-auto w-full hover:bg-blue-600"
				>
					Editar
				</Link>
			)}
			{id === paramsId.id && (
				<>
					<h3 className="text-center text-lg">Analiticas</h3>

					<section className="flex flex-col gap-2 max-w-lg mx-auto w-full">
						<PorcentajeComponent
							title="desacuerdo"
							porcentaje={porcentajeDesacuerdo}
						/>
						<PorcentajeComponent
							title="acuerdo"
							porcentaje={porcentajeAcuerdo}
						/>
					</section>
				</>
			)}
			<ul className="flex flex-col gap-6 max-w-lg mx-auto w-full">
				{user.posts.reverse().map((post: Post) => (
					<PostComponent
						key={post._id}
						author={post.author.username}
						date={post.date}
						title={post.title}
						body={post.body}
						authorId={post.author._id}
						profile={id === paramsId.id}
						id={post._id}
						acuerdo={post.acuerdo.some((item) => item._id === id)}
						desacuerdo={post.desacuerdo.some((item) => item._id === id)}
						acuerdos={post.acuerdo}
						desacuerdos={post.desacuerdo}
					/>
				))}
			</ul>
		</main>
	);
}
