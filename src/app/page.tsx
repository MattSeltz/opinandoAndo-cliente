import { cookies } from "next/headers";

import { PostComponent } from "@/components/post/PostComponent";

export default async function Home() {
	const cookieStore = await cookies();
	const miCookie = cookieStore.get("token");

	return (
		<main className="p-4 flex flex-col gap-4">
			<div className="flex flex-col justify-center gap-4">
				<h3 className="text-center text-lg">Posts</h3>
				{miCookie && (
					<button
						type="button"
						className="bg-blue-500 text-white rounded p-2 shadow max-w-lg mx-auto w-full cursor-pointer transition-colors hover:bg-blue-600"
					>
						Añadir Post
					</button>
				)}
			</div>

			<ul className="flex flex-col gap-6 max-w-lg mx-auto">
				<PostComponent />
			</ul>
		</main>
	);
}
