import Link from "next/link";

interface Props {
	title: string;
	id: string;
}

export const LinkComponent = ({ title, id }: Props) => {
	return (
		<p>
			Tus posts tienen <b>50%</b> de{" "}
			<Link
				className={`${
					title === "acuerdo"
						? "text-blue-500 hover:text-blue-600"
						: "text-red-500 hover:text-red-600"
				} transition-colors`}
				href={`/profile/${id}/${title}`}
			>
				{title}
			</Link>
		</p>
	);
};
