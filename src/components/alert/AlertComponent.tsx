"use client";

type AlertProps = {
	type: "error" | "warning" | "success";
	message: string;
	onClose?: () => void;
};

export const AlertComponent = ({ type, message, onClose }: AlertProps) => {
	const icons = {
		error: (
			<svg
				className="h-5 w-5 text-red-600"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<line x1="12" y1="8" x2="12" y2="12" />
				<line x1="12" y1="16" x2="12.01" y2="16" />
			</svg>
		),
		warning: (
			<svg
				className="h-5 w-5 text-yellow-600"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
				<line x1="12" y1="9" x2="12" y2="13" />
				<line x1="12" y1="17" x2="12.01" y2="17" />
			</svg>
		),
		success: (
			<svg
				className="h-5 w-5 text-green-600"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M20 6L9 17l-5-5" />
			</svg>
		),
	};

	const bgColors = {
		error: "bg-red-100 border-red-500 text-red-700",
		warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
		success: "bg-green-100 border-green-500 text-green-700",
	};

	return (
		<div
			className={`flex items-center p-4 border rounded-lg max-w-lg mx-auto w-full ${bgColors[type]}`}
		>
			{icons[type]}
			<span className="ml-3 flex-1">{message}</span>
			{onClose && (
				<button
					onClick={onClose}
					className="ml-3 text-gray-600 hover:text-gray-800"
				>
					✖
				</button>
			)}
		</div>
	);
};
