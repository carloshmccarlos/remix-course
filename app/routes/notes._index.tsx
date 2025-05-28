import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import NewNote from "~/components/NewNote";
import NoteList from "~/components/NoteList";

import type { Note } from "~/generated/prisma";
import type { NoteCreateInput } from "~/generated/prisma/models/Note";
import { getNotes, storeNotes } from "../../prisma/db/notes";

export const meta: MetaFunction = () => {
	return [{ title: "All Notes", description: "Manage all your notes" }];
};

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();

	const noteData: NoteCreateInput = Object.fromEntries(
		formData,
	) as NoteCreateInput;

	if (noteData.title.trim().length < 5) {
		return {
			message: "Invalid title - must be at least 5 characters",
		};
	}

	await storeNotes(noteData);
	return {
		success: true,
	};
}

export async function loader() {
	const notes: Note[] = (await getNotes()) ?? [];

	return notes;
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

export default function NotesPage() {
	const notes: Note[] = useLoaderData();

	return (
		<main>
			<NewNote />
			<NoteList notes={notes} />
		</main>
	);
}
