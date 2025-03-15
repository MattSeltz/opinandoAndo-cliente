"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

import { postData } from "@/services/services";

import { setUserCookie } from "@/app/actions";

import { InputComponent } from "./InputComponent";

type Type = "error" | "warning" | "success";

interface Props {
	isSignIn: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setType: Dispatch<SetStateAction<Type>>;
	setMessage: Dispatch<SetStateAction<string>>;
}

export const FormComponent = ({
	isSignIn,
	setIsOpen,
	setType,
	setMessage,
}: Props) => {
	const router = useRouter();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [date, setDate] = useState("");
	const [sex, setSex] = useState("");
	const [country, setCountry] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const register = async () => {
		if (!username || !email || !password || !date || !sex || !country) {
			setIsOpen(true);
			setType("warning");
			setMessage("Todos los campos son requeridos");
		} else {
			setIsLoading(true);

			const user = {
				username,
				email,
				password,
				date,
				sex,
				country,
			};

			try {
				const [isSuccess] = await postData("auth/register", user);

				if (isSuccess) {
					setIsOpen(true);
					setType("success");
					setMessage("Usuario generado con exito!");

					setTimeout(() => {
						router.push("/signIn");
					}, 2500);
				} else {
					throw new Error("Error al crear el usuario");
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

	const login = async () => {
		if (!email || !password) {
			setIsOpen(true);
			setType("warning");
			setMessage("Todos los campos son requeridos");
		} else {
			setIsLoading(true);

			const user = {
				email,
				password,
			};

			try {
				const [isSuccess, res] = await postData("auth/login", user);

				if (isSuccess) {
					setIsOpen(true);
					setType("success");
					setMessage("Iniciando sesión!");

					sessionStorage.setItem("user", res.id);
					await setUserCookie(res.id);

					setTimeout(() => {
						router.push("/");
					}, 2500);
				} else {
					throw new Error("Error al iniciar sesión");
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!isSignIn) {
			register();
		} else {
			login();
		}
	};

	return (
		<form
			autoComplete="off"
			className="flex flex-col gap-4 max-w-lg mx-auto w-full"
			onSubmit={handleSubmit}
		>
			{!isSignIn && (
				<InputComponent
					title="Nombre de Usuario"
					altTitle="username"
					type="text"
					value={username}
					setValue={setUsername}
				/>
			)}
			<InputComponent
				title="Email"
				altTitle="email"
				type="email"
				value={email}
				setValue={setEmail}
			/>
			<InputComponent
				title="Contraseña"
				altTitle="password"
				type="password"
				value={password}
				setValue={setPassword}
			/>
			{!isSignIn && (
				<>
					<InputComponent
						title="Fecha de Nacimiento"
						altTitle="date"
						type="date"
						value={date}
						setValue={setDate}
					/>
					<div className="flex flex-col gap-2">
						<label htmlFor="sex">Sexo</label>
						<select
							name="sex"
							id="sex"
							className="shadow rounded p-2 focus:outline-0"
							value={sex}
							onChange={(e) => setSex(e.target.value)}
						>
							<option value="" hidden>
								{" "}
								-{" "}
							</option>
							<option value="Masculino">Masculino</option>
							<option value="Femenino">Femenino</option>
						</select>
					</div>
					<InputComponent
						title="País"
						altTitle="country"
						type="text"
						value={country}
						setValue={setCountry}
					/>
				</>
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
				) : !isSignIn ? (
					"Registrarse"
				) : (
					"Iniciar Sesión"
				)}
			</button>
		</form>
	);
};
