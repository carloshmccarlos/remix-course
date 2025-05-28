import {
	type LinksFunction,
	type MetaFunction,
	redirect,
} from "@remix-run/node";
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useRouteError,
} from "@remix-run/react";

import "./tailwind.css";
import MainNavigation from "~/components/MainNavigation";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },

	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	/*const navigation = useNavigation();
	const isLoading = navigation.state === "loading";*/

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>

			<body
				className={
					"overflow-y-scroll min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
				}
			>
				<header>
					<MainNavigation />
				</header>

				{/*	{isLoading && (
					<>
						<div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-40" />
						<div className="absolute top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
							<Spinner />
						</div>
					</>
				)}*/}

				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<div>
				<h1>
					{error.status} {error.statusText}
				</h1>
				<p>{error.data.message}</p>
				<Link className={" font-bold text-2xl "} to={"/"}>
					Back to Home
				</Link>
			</div>
		);
	}
	if (error instanceof Error)
		return (
			<div>
				<h1>Error</h1>
				<p>{error.message}</p>

				<Link className={"font-bold text-2xl "} to={"/"}>
					Back to Home
				</Link>
			</div>
		);
	return <h1>Unknown Error</h1>;
}
