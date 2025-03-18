"use client";

import { useRouter } from "next/navigation";

import { postData } from "@/services/services";

import { SignOutComponent } from "../icons/IconsComponent";

export const SignOutButtonComponent = () => {
	const router = useRouter();

	const handleClick = async () => {
		try {
			const [isSuccess] = await postData("auth/logout", undefined);

			if (isSuccess) {
				sessionStorage.removeItem("user");
				router.push("/");
				router.refresh();
			} else {
				console.log("Error!");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<span
			onClick={handleClick}
			className="cursor-pointer transition-opacity hover:opacity-50"
		>
			<SignOutComponent />
		</span>
	);
};
