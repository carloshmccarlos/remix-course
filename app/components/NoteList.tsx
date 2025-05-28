import { Link } from "@remix-run/react";
import type { Note } from "~/db/schema";

interface Props {
	notes: Note[];
}

export default function NoteList({ notes }: Props) {
	return (
		<div className="w-full  p-16 mx-auto ">
			{notes.length === 0 ? (
				<p className="text-center text-gray-500">No notes found.</p>
			) : (
				<ul className=" grid grid-cols-4 gap-2 ">
					{notes.map((note) => (
						<li
							key={note.id}
							className="cursor-pointer bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200"
						>
							<Link
								to={`/notes/${note.id}`}
								className="text-xl font-semibold text-blue-700 mb-2"
							>
								{note.title}
								<p className="text-gray-700 mb-4">{note.content}</p>
								<small className="text-gray-400">
									Created at: {new Date(note.createdAt).toLocaleString()}
								</small>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
