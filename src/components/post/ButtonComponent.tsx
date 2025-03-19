"use client";

import { useRouter } from "next/navigation";

import { putData } from "@/services/services";

interface Props {
	title: string;
	id: string;
	isVote: boolean | undefined;
}

export const ButtonComponent = ({ title, id, isVote }: Props) => {
	const router = useRouter();

	const handleClick = async () => {
		if (sessionStorage.getItem("user")) {
			if (isVote) return;
			try {
				const [isSuccess] = await putData("posts/vote", id, {
					type: title.toLowerCase(),
					userId: sessionStorage.getItem("user"),
				});

				if (isSuccess) {
					console.log("Voto!");
					router.refresh();
				} else {
					console.log("Error!");
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			router.push("/signIn");
		}
	};

	return (
		<button
			type="button"
			className={`text-white rounded p-2 shadow transition-colors
  ${
		isVote
			? "w-full cursor-not-allowed bg-gray-400"
			: title === "Acuerdo"
			? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
			: "bg-red-500 hover:bg-red-600 cursor-pointer"
	}
`}
			onClick={handleClick}
		>
			{title}
		</button>
	);
};
