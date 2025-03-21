"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

import type { AlertType } from "@/types/types";

import { postData, putData } from "@/services/services";

interface Props {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setType: Dispatch<SetStateAction<AlertType>>;
	setMessage: Dispatch<SetStateAction<string>>;
}

export const FormComponent = ({ setIsOpen, setType, setMessage }: Props) => {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [password, setPassword] = useState("");
	const [passwordR, setPasswordR] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSendCode, setIsSendCode] = useState(false);
	const [isSendPassword, setIsSendPassword] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			setIsOpen(true);
			setType("warning");
			setMessage("Todos los campos son requeridos");
		} else {
			setIsLoading(true);

			try {
				const [isSuccess] = await postData("email", { to: email });

				if (isSuccess) {
					setIsOpen(true);
					setType("success");
					setMessage("Email enviado con exito!");
					setIsSendCode(true);
				} else {
					throw new Error("Error al enviar el email");
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

	const handleSubmitCode = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!code) {
			setIsOpen(true);
			setType("warning");
			setMessage("Todos los campos son requeridos");
		} else {
			setIsLoading(true);

			try {
				const [isSuccess] = await postData("email/match", { id: code });

				if (isSuccess) {
					setIsOpen(true);
					setType("success");
					setMessage("Código enviado con exito!");
					setIsSendPassword(true);
				} else {
					throw new Error("Error al enviar el código");
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

	const handleSubmitPassword = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!password || !passwordR) {
			setIsOpen(true);
			setType("warning");
			setMessage("Todos los campos son requeridos");
		} else {
			if (password !== passwordR) {
				setIsOpen(true);
				setType("error");
				setMessage("Las contraseñas no coinciden");
			} else {
				setIsLoading(true);

				try {
					const [, res] = await postData("email/user", { email });
					const [isSuccess] = await putData("auth/recovery", res._id, {
						password,
					});

					if (isSuccess) {
						setIsOpen(true);
						setType("success");
						setMessage("Contraseña modificada con exito!");

						setTimeout(() => {
							router.push("/signIn");
						}, 2500);
					} else {
						throw new Error("Error al modificar la contraseña");
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
		}
	};

	return (
		<form
			autoComplete="off"
			className="flex flex-col gap-4 max-w-lg mx-auto w-full"
			onSubmit={
				isSendPassword
					? handleSubmitPassword
					: isSendCode
					? handleSubmitCode
					: handleSubmit
			}
		>
			{isSendPassword ? (
				<>
					<div className="flex flex-col gap-2">
						<label htmlFor="password">Contraseña</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Contraseña"
							className="shadow rounded p-2 focus:outline-0"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="passwordR">Repita la Contraseña</label>
						<input
							type="password"
							name="passwordR"
							id="passwordR"
							placeholder="Repita la Contraseña"
							className="shadow rounded p-2 focus:outline-0"
							value={passwordR}
							onChange={(e) => setPasswordR(e.target.value)}
						/>
					</div>
				</>
			) : isSendCode ? (
				<div className="flex flex-col gap-2">
					<label htmlFor="code">Código</label>
					<input
						type="text"
						name="code"
						id="code"
						placeholder="Código"
						className="shadow rounded p-2 focus:outline-0"
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						className="shadow rounded p-2 focus:outline-0"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
			)}

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
					"Enviar"
				)}
			</button>
		</form>
	);
};
