interface Props {
	title: string;
	altTitle: string;
	type: string;
}

export const InputComponent = ({ title, altTitle, type }: Props) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={altTitle}>{title}</label>
			<input
				type={type}
				name={altTitle}
				id={altTitle}
				placeholder={title}
				className="shadow rounded p-2 focus:outline-0"
			/>
		</div>
	);
};
