interface Props {
	title: string;
	porcentaje: number;
}

export const PorcentajeComponent = ({ title, porcentaje }: Props) => {
	return (
		<p>
			Tus posts tienen <b>{porcentaje}%</b> de{" "}
			<span
				className={`${title === "acuerdo" ? "text-blue-500" : "text-red-500"}`}
			>
				{title}
			</span>
		</p>
	);
};
