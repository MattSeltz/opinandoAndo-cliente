import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import { HeaderComponent } from "@/components/header/HeaderComponent";
import { FooterComponent } from "@/components/footer/FooterComponent";

const openSans = Open_Sans({
	weight: ["300", "500", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "OpinandoAndo",
	description: "Social App made by Matías Seltzer",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body
				className={`${openSans.className} antialiased h-screen flex flex-col justify-between`}
			>
				<HeaderComponent />
				{children}
				<FooterComponent />
			</body>
		</html>
	);
}
