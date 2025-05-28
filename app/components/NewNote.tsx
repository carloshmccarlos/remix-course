import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import type { action } from "~/routes/notes._index";

export default function NewNote() {
	const navigation = useNavigation();
	const formRef = useRef<HTMLFormElement>(null);
	const actionData = useActionData<typeof action>();

	useEffect(() => {
		if (
			navigation.state === "idle" &&
			actionData?.success === true &&
			formRef.current
		) {
			formRef.current?.reset();
		}
	}, [navigation, actionData]);

	const isSubmitting = navigation.state === "submitting";

	return (
		<div className="pt-12 px-4 sm:px-6 lg:px-8 w-full">
			<div className="relative max-w-md mx-auto">
				<Form
					ref={formRef}
					method="post"
					className="relative space-y-6 p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
				>
					<div className="text-center space-y-2">
						<h2 className="text-3xl font-bold text-indigo-600">
							Create New Note
						</h2>
						<p className="text-gray-500 text-sm">Add your thoughts and ideas</p>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="title"
							className="block text-sm font-semibold text-gray-700"
						>
							Title
						</label>
						<input
							required
							id="title"
							type="text"
							name="title"
							placeholder="Enter note title"
							className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-indigo-200"
						/>
						{actionData?.message && <p>{actionData.message}</p>}
					</div>

					<div className="space-y-2">
						<label
							htmlFor="content"
							className="block text-sm font-semibold text-gray-700"
						>
							Content
						</label>
						<input
							required
							id="content"
							type="text"
							name="content"
							placeholder="Enter note content"
							className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out hover:border-indigo-200"
						/>
					</div>

					<div className="pt-6">
						<button
							type="submit"
							className="w-full bg-indigo-500 text-white py-3 px-4 rounded-xl hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 ease-in-out font-medium shadow-lg"
						>
							{isSubmitting ? "Submitting" : "Submit"}
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
}
