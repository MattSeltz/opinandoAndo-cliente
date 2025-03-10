import { FormComponent } from "@/components/form/FormComponent";

export default function SignUp() {
	return (
		<main className="p-4 flex flex-col gap-4">
			<h3 className="text-center text-lg">Registrarse</h3>

			<FormComponent type="register" />
		</main>
	);
}
