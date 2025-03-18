import Link from "next/link";

import { ButtonComponent } from "./ButtonComponent";
import { DeleteButtonComponent } from "./DeleteButtonComponent";

interface Props {
	author: string;
	date: string;
	title: string;
	body: string;
	authorId: string;
	profile: boolean;
	id: string;
	acuerdo?: boolean;
	desacuerdo?: boolean;
}

export const PostComponent = ({
	author,
	date,
	title,
	body,
	authorId,
	profile,
	id,
	acuerdo,
	desacuerdo,
}: Props) => {
	return (
		<li className="shadow rounded p-4">
			<article className="flex flex-col gap-2">
				<header className="flex justify-between mb-2 items-center">
					<Link href={`/profile/${authorId}`}>
						<small>
							<b>{author}</b>
						</small>
					</Link>
					<div className="flex gap-2 items-center">
						<small>{date}</small>
						{profile && <DeleteButtonComponent id={id} />}
					</div>
				</header>
				<h3 className="text-center font-bold">{title}</h3>
				<section>
					<p>{body}</p>
				</section>
				<footer className="flex justify-between mt-4">
					{!acuerdo && (
						<ButtonComponent
							title="Desacuerdo"
							userId={authorId}
							id={id}
							isVote={acuerdo || desacuerdo}
						/>
					)}
					{!desacuerdo && (
						<ButtonComponent
							title="Acuerdo"
							userId={authorId}
							id={id}
							isVote={acuerdo || desacuerdo}
						/>
					)}
				</footer>
			</article>
		</li>
	);
};
