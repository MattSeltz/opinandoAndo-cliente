interface Props {
	title: string;
}

export const ButtonComponent = ({ title }: Props) => {
	return (
		<button
			type="button"
			className={`${
				title === "Acuerdo"
					? "bg-blue-500 hover:bg-blue-600"
					: "bg-red-500 hover:bg-red-600"
			} text-white rounded p-2 shadow cursor-pointer transition-colors`}
		>
			{title}
		</button>
	);
};
