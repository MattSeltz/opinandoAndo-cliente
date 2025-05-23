import Link from "next/link";
import { cookies, headers } from "next/headers";

import { LiComponent } from "./LiComponent";
import { SignOutButtonComponent } from "./SignOutButtonComponent";

export const HeaderComponent = async () => {
	const headersList = await headers();
	console.log("Cookies en SSR:", headersList.get("cookie"));

	const cookieStore = await cookies();
	const miCookie = cookieStore.get("token");
	const userId = cookieStore.get("userId")?.value;

	return (
		<header className="flex items-center justify-between bg-blue-500 text-white p-4">
			<Link href={"/"}>
				<h1 className="text-xl font-bold tracking-widest">OpinandoAndo</h1>
			</Link>

			<nav>
				<ul className="flex gap-4">
					{miCookie ? (
						<>
							<LiComponent to={`/profile/${userId}`}>Profile</LiComponent>
							<SignOutButtonComponent />
						</>
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
