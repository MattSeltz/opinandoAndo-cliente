"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getOneData, postData, putData } from "@/services/services";

import { setUserCookie } from "@/app/actions";

import { InputComponent } from "./InputComponent";

type Type = "error" | "warning" | "success";

interface Props {
	isSignIn: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setType: Dispatch<SetStateAction<Type>>;
	setMessage: Dispatch<SetStateAction<string>>;
	id?: string;
}

export const FormComponent = ({
	isSignIn,
	setIsOpen,
	setType,
	setMessage,
	id,
}: Props) => {
	const router = useRouter();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [date, setDate] = useState("");
	const [sex, setSex] = useState("");
	const [country, setCountry] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (id) {
			getOneData("users", id)
				.then((res) => {
					if (res[0]) {
						setUsername(res[1].username);
						setEmail(res[1].email);
						setDate(res[1].date);
						setSex(res[1].sex);
						setCountry(res[1].country);
					}
				})
				.catch((e) => console.error(e));
		}
	}, []);

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

	const handleEdit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username || !email || !date || !sex || !country) {
			setIsOpen(true);
			setType("warning");
			setMessage("Todos los campos son requeridos");
		} else {
			setIsLoading(true);

			const user = {
				username,
				email,
				date,
				sex,
				country,
			};

			try {
				const [isSuccess] = await putData("users", id, user);

				if (isSuccess) {
					setIsOpen(true);
					setType("success");
					setMessage("Usuario editado con exito!");

					setTimeout(() => {
						router.push(`/profile/${id}`);
					}, 2500);
				} else {
					throw new Error("Error al editar el usuario");
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
			onSubmit={id ? handleEdit : handleSubmit}
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
			{!id && (
				<InputComponent
					title="Contraseña"
					altTitle="password"
					type="password"
					value={password}
					setValue={setPassword}
				/>
			)}

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
					id ? (
						"Editar"
					) : (
						"Registrarse"
					)
				) : (
					"Iniciar Sesión"
				)}
			</button>
		</form>
	);
};
