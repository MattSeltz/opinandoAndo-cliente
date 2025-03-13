"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

import { postData } from "@/services/services";

type Type = "error" | "warning" | "success";

interface Props {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setType: Dispatch<SetStateAction<Type>>;
	setMessage: Dispatch<SetStateAction<string>>;
}

export const FormComponent = ({ setIsOpen, setType, setMessage }: Props) => {
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !body) {
			setIsOpen(true);
			setType("warning");
			setMessage("Todos los campos son requeridos");
		} else {
			const post = {
				title,
				body,
				date: `${new Date().getDate()}/${
					new Date().getMonth() + 1
				}/${new Date().getFullYear()}`,
				author: sessionStorage.getItem("user"),
			};

			try {
				const [isSuccess] = await postData("posts", post);

				if (isSuccess) {
					setIsOpen(true);
					setType("success");
					setMessage("Post generado con exito!");

					setTimeout(() => {
						router.push("/");
					}, 2500);
				} else {
					throw new Error("Error al crear el post");
				}
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message);
					setIsOpen(true);
					setType("error");
					setMessage(error.message);
				} else {
					console.error("Error desconocido", error);
				}
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<form
			autoComplete="off"
			className="flex flex-col gap-4 max-w-lg mx-auto w-full"
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="title">Título</label>
				<input
					type="text"
					name="title"
					id="title"
					placeholder="Título"
					className="shadow rounded p-2 focus:outline-0"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="body">Descripción</label>
				<textarea
					name="body"
					id="body"
					placeholder="Descripción"
					rows={9}
					className="shadow rounded p-2 resize-none focus:outline-0"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				></textarea>
			</div>
			<button
				type="submit"
				className={`bg-blue-500 text-white rounded shadow p-2 transition-colors
      ${
				isLoading
					? "cursor-not-allowed bg-gray-400"
					: "cursor-pointer hover:bg-blue-600"
			}`}
				disabled={isLoading}
			>
				{isLoading ? (
					<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
				) : (
					"Añadir Post"
				)}
			</button>
		</form>
	);
};
