import prisma from "~/lib/prisma";

async function main() {
	// Clean up existing data
	await prisma.note.deleteMany();

	// Create sample notes
	const notes = await Promise.all([
		prisma.note.create({
			data: {
				title: "Welcome Note",
				content:
					"Welcome to your new note-taking app! This is your first note.",
			},
		}),
	]);

	console.log("Database has been seeded. 🌱");
	console.log("Created notes:", notes);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
