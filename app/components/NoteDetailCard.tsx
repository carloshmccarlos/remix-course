import type { Note } from "~/generated/prisma";
interface Props {
	note: Note;
}

export default function NoteDetailCard({ note }: Props) {
	return (
		<div className="bg-white rounded-lg shadow-lg p-8">
			<h1 className="text-3xl font-bold text-gray-900 mb-4">{note.title}</h1>
			<div className="text-sm text-gray-500 mb-6">
				Created on {note.createdAt.toLocaleDateString()}
			</div>
			<div className="prose prose-lg">
				{note.content.split("\n").map((paragraph: string, index: number) => (
					<p key={`${note.id}-${index}`} className="mb-4">
						{paragraph}
					</p>
				))}
			</div>
		</div>
	);
}
