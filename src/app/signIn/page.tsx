"use client";

import { useState } from "react";

import { AlertComponent } from "@/components/alert/AlertComponent";
import { FormComponent } from "@/components/form/FormComponent";

type Type = "error" | "warning" | "success";

export default function SignIn() {
	const [isOpen, setIsOpen] = useState(false);
	const [type, setType] = useState<Type>("success");
	const [message, setMessage] = useState("");

	return (
		<main className="p-4 flex flex-col gap-4">
			<h3 className="text-center text-lg">Iniciar Sesión</h3>

			{isOpen && (
				<AlertComponent
					type={type}
					message={message}
					onClose={() => setIsOpen(false)}
				/>
			)}

			<FormComponent
				isSignIn={true}
				setIsOpen={setIsOpen}
				setType={setType}
				setMessage={setMessage}
			/>
		</main>
	);
}
