"use client";

import { useState } from "react";

import type { AlertType } from "@/types/types";

import { AlertComponent } from "@/components/alert/AlertComponent";
import { FormComponent } from "@/components/recovery/FormComponent";

export default function Recovery() {
	const [isOpen, setIsOpen] = useState(false);
	const [type, setType] = useState<AlertType>("success");
	const [message, setMessage] = useState("");

	return (
		<main className="p-4 flex flex-col gap-4">
			<h3 className="text-center text-lg">Recuperar Contraseña</h3>

			{isOpen && (
				<AlertComponent
					type={type}
					message={message}
					onClose={() => setIsOpen(false)}
				/>
			)}

			<FormComponent
				setIsOpen={setIsOpen}
				setType={setType}
				setMessage={setMessage}
			/>
		</main>
	);
}
