"use client";

import { useRouter } from "next/navigation";

import { deleteData } from "@/services/services";

import { TrashComponent } from "../icons/IconsComponent";

interface Props {
	id: string;
}

export const DeleteButtonComponent = ({ id }: Props) => {
	const router = useRouter();

	const handleClick = async () => {
		try {
			const [isSuccess] = await deleteData("posts", id);

			if (isSuccess) {
				const [isSuccess] = await deleteData("users/deletePost", id);

				if (isSuccess) {
					router.refresh();
				} else {
					console.log("Error!");
				}
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
			className="rounded-full border-2 border-red-500 p-2 shadow cursor-pointer transition-opacity hover:opacity-50"
		>
			<TrashComponent />
		</span>
	);
};
