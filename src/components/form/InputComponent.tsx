import { Dispatch, SetStateAction } from "react";

interface Props {
	title: string;
	altTitle: string;
	type: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

export const InputComponent = ({
	title,
	altTitle,
	type,
	value,
	setValue,
}: Props) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={altTitle}>{title}</label>
			<input
				type={type}
				name={altTitle}
				id={altTitle}
				placeholder={title}
				className="shadow rounded p-2 focus:outline-0"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};
