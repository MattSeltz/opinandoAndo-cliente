"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import type { AlertType } from "@/types/types";

import { AlertComponent } from "@/components/alert/AlertComponent";
import { FormComponent } from "@/components/form/FormComponent";

export default function Edit() {
	const params = useParams<{ id: string }>();

	const [isOpen, setIsOpen] = useState(false);
	const [type, setType] = useState<AlertType>("success");
	const [message, setMessage] = useState("");

	return (
		<main className="p-4 flex flex-col gap-4">
			<h3 className="text-center text-lg">Editar</h3>

			{isOpen && (
				<AlertComponent
					type={type}
					message={message}
					onClose={() => setIsOpen(false)}
				/>
			)}

			<FormComponent
				isSignIn={false}
				setIsOpen={setIsOpen}
				setType={setType}
				setMessage={setMessage}
				id={params.id}
			/>
		</main>
	);
}
