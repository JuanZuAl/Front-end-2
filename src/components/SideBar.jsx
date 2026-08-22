import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
	{ label: "Dashboard", to: "/dashboard" },
	{ label: "Courses", to: "/courses" },
	{ label: "Students", to: "/students" },
	{ label: "Enrollment", to: "/enrollment" },
];

function SideBar() {
	const [isOpen, setIsOpen] = useState(true);

	if (!isOpen) {
		return (
			<button
				onClick={() => setIsOpen(true)}
				style={{
					position: "fixed",
					top: "1rem",
					left: "1rem",
					padding: "0.5rem 0.75rem",
					border: "1px solid #cbd5e1",
					borderRadius: "0.5rem",
					backgroundColor: "#ffffff",
					cursor: "pointer",
					zIndex: 1000,
				}}
			>
				&gt;
			</button>
		);
	}

	return (
		<aside style={{ width: "220px", padding: "1rem", borderRight: "1px solid #e5e7eb" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<h2 style={{ marginTop: 0 }}>Menu</h2>
				<button
					onClick={() => setIsOpen(false)}
					style={{
						padding: "0.25rem 0.5rem",
						border: "1px solid #cbd5e1",
						borderRadius: "0.5rem",
						backgroundColor: "#ffffff",
						cursor: "pointer",
					}}
				>
					&lt;
				</button>
			</div>
			<nav>
				<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
					{links.map((link) => (
						<li key={link.to} style={{ marginBottom: "0.75rem" }}>
							<NavLink
								to={link.to}
								style={({ isActive }) => ({
									textDecoration: "none",
									color: isActive ? "#0f172a" : "#334155",
									fontWeight: isActive ? 700 : 500,
								})}
							>
								{link.label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}

export default SideBar;
