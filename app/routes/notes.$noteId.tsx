import {
	type LoaderFunctionArgs,
	type MetaFunction,
	data,
} from "@remix-run/node";
import {
	Link,
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
} from "@remix-run/react";
import NoteDetailCard from "~/components/NoteDetailCard";
import { Layout } from "~/root";

import type { Note } from "~/generated/prisma";
import { getNoteById } from "../../prisma/db/notes";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data) {
		return [{ title: "Note Not Found" }];
	}
	return [
		{
			title: data.title,
			description: `Detail of note ${data.id}`,
		},
	];
};

export async function loader({ params }: LoaderFunctionArgs) {
	const id = params.noteId;
	const note = await getNoteById(Number(id));

	if (!note) {
		throw data(
			{ message: "Note Not Found" },
			{ status: 404, statusText: "Not Found" },
		);
	}
	return note;
}

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

				<Link className={" font-bold text-2xl "} to={"/"}>
					Back to Home
				</Link>
			</div>
		);
	return <h1>Unknown Error</h1>;
}

export default function NoteDetailPage() {
	const note: Note = useLoaderData<typeof loader>() as Note;

	return (
		<div className="max-w-4xl mx-auto p-6">
			<NoteDetailCard note={note} />
		</div>
	);
}
