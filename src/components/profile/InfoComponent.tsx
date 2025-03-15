interface Props {
	title: string;
	info: string;
}

export const InfoComponent = ({ title, info }: Props) => {
	return (
		<p>
			<b>{title}:</b> <small>{info}</small>
		</p>
	);
};
