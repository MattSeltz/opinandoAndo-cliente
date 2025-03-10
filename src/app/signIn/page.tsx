import { FormComponent } from "@/components/form/FormComponent";

export default function SignIn() {
	return (
		<main className="p-4 flex flex-col gap-4">
			<h3 className="text-center text-lg">Iniciar Sesión</h3>

			<FormComponent type="sesion" />
		</main>
	);
}
