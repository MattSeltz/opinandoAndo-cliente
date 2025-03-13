import Link from "next/link";
import { cookies } from "next/headers";

import { LiComponent } from "./LiComponent";

export const HeaderComponent = async () => {
	const cookieStore = await cookies();
	const miCookie = cookieStore.get("token");

	return (
		<header className="flex items-center justify-between bg-blue-500 text-white p-4">
			<Link href={"/"}>
				<h1 className="text-xl font-bold tracking-widest">XYZ</h1>
			</Link>

			<nav>
				<ul className="flex gap-4">
					{miCookie ? (
						<LiComponent to="/">Profile</LiComponent>
					) : (
						<>
							<LiComponent to="/signIn">SignIn</LiComponent>
							<LiComponent to="/signUp">SignUp</LiComponent>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};
