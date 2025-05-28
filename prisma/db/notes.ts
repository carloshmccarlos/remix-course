import type { Prisma } from "~/generated/prisma";
import prisma from "~/lib/prisma";

export async function getNotes() {
	return prisma.note.findMany() || [];
}

export async function storeNotes(note: Prisma.NoteCreateInput) {
	return prisma.note.create({
		data: note,
	});
}

export async function getNoteById(id: number) {
	return prisma.note.findUnique({
		where: {
			id: id,
		},
	});
}

export async function deleteNotes() {
	return prisma.note.deleteMany();
}
