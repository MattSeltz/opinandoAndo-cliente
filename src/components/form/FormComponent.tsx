"use client";

import { useState } from "react";

import { postData } from "@/services/services";

import { InputComponent } from "./InputComponent";

interface Props {
	type: string;
}

export const FormComponent = ({ type }: Props) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [date, setDate] = useState("");
	const [sex, setSex] = useState("");
	const [country, setCountry] = useState("");

	const register = async () => {
		if (!username || !email || !password || !date || !sex || !country) {
			alert("Error!");
		} else {
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
					alert("Usuario generado con exito!");
				} else {
					throw new Error("Error al crear el usuario");
				}
			} catch (error) {
				console.error(error);
			} finally {
				alert("Finalizo!");
			}
		}
	};

	const login = async () => {
		if (!email || !password) {
			alert("Error!");
		} else {
			const user = {
				email,
				password,
			};

			try {
				const [isSuccess] = await postData("auth/login", user);

				if (isSuccess) {
					alert("Iniciando sesión!");
				} else {
					throw new Error("Error al iniciar sesión");
				}
			} catch (error) {
				console.error(error);
			} finally {
				alert("Finalizo!");
			}
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (type === "register") {
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
			{type === "register" && (
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
			{type === "register" && (
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
				className="bg-blue-500 text-white rounded shadow p-2 cursor-pointer transition-colors hover:bg-blue-600"
			>
				{type === "register" ? "Registrarse" : "Iniciar Sesión"}
			</button>
		</form>
	);
};
