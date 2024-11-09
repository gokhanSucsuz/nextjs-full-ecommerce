import "../globals.css";

export const metadata = {
	title: "Sanity Studio",
	description: "Backend"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <html lang="en">
			<body suppressHydrationWarning>
				{children}
			</body>
		</html>;
}
