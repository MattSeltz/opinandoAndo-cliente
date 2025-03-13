import { ButtonComponent } from "./ButtonComponent";

export const PostComponent = () => {
	return (
		<li className="shadow rounded p-4">
			<article className="flex flex-col gap-2">
				<header className="flex justify-between mb-2">
					<small>
						<b>MattSeltz</b>
					</small>
					<small>2025-03-13</small>
				</header>
				<h3 className="text-center font-bold">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.{" "}
				</h3>
				<section>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus culpa
						vel quaerat ut necessitatibus, libero perferendis cumque officiis
						quasi consequatur ipsum, quas cum ullam dicta iste perspiciatis ab
						nemo est?
					</p>
				</section>
				<footer className="flex justify-between mt-4">
					<ButtonComponent title="Desacuerdo" />
					<ButtonComponent title="Acuerdo" />
				</footer>
			</article>
		</li>
	);
};
