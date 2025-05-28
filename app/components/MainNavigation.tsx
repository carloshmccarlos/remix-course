import { NavLink } from "@remix-run/react";

export default function MainNavigation() {
	return (
		<nav>
			<ul className={"flex flex-row gap-4"}>
				<li>
					<NavLink to={"/"}>Home</NavLink>
				</li>
				<li>
					<NavLink to={"/notes"}>Notes</NavLink>
				</li>
			</ul>
		</nav>
	);
}
