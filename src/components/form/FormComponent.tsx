import { InputComponent } from "./InputComponent";

interface Props {
	type: string;
}

export const FormComponent = ({ type }: Props) => {
	return (
		<form
			autoComplete="off"
			className="flex flex-col gap-4 max-w-lg mx-auto w-full"
		>
			{type === "register" && (
				<InputComponent
					title="Nombre de Usuario"
					altTitle="username"
					type="text"
				/>
			)}
			<InputComponent title="Email" altTitle="email" type="email" />
			<InputComponent title="Contraseña" altTitle="password" type="password" />
			<button
				type="submit"
				className="bg-blue-500 text-white rounded shadow p-2 cursor-pointer transition-colors hover:bg-blue-600"
			>
				{type === "register" ? "Registrarse" : "Iniciar Sesión"}
			</button>
		</form>
	);
};
