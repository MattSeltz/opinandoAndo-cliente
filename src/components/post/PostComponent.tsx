import { ButtonComponent } from "./ButtonComponent";

interface Props {
	author: string;
	date: string;
	title: string;
	body: string;
}

export const PostComponent = ({ author, date, title, body }: Props) => {
	return (
		<li className="shadow rounded p-4">
			<article className="flex flex-col gap-2">
				<header className="flex justify-between mb-2">
					<small>
						<b>{author}</b>
					</small>
					<small>{date}</small>
				</header>
				<h3 className="text-center font-bold">{title}</h3>
				<section>
					<p>{body}</p>
				</section>
				<footer className="flex justify-between mt-4">
					<ButtonComponent title="Desacuerdo" />
					<ButtonComponent title="Acuerdo" />
				</footer>
			</article>
		</li>
	);
};
