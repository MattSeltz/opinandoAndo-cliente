import Link from "next/link";

import { LiComponent } from "./LiComponent";

export const HeaderComponent = () => {
	return (
		<header className="flex items-center justify-between bg-blue-500 text-white p-4">
			<Link href={"/"}>
				<h1 className="text-xl font-bold tracking-widest">XYZ</h1>
			</Link>

			<nav>
				<ul className="flex gap-4">
					<LiComponent to="/signIn">SignIn</LiComponent>
					<LiComponent to="/signUp">SignUp</LiComponent>
				</ul>
			</nav>
		</header>
	);
};
