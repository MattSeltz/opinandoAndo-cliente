import Link from "next/link";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	to: string;
}

export const LiComponent = ({ children, to }: Props) => {
	return (
		<li className="cursor-pointer transition-opacity hover:opacity-50">
			<Link href={to}>{children}</Link>
		</li>
	);
};
