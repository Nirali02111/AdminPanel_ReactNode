import React from "react";
import { Link, NavLink } from "react-router-dom";

export const SidebarNav = () => {
	return (
		<>
			<div id="SidebarNav">
				<div className="user">
					<div className="name">User Name</div>
					<div className="role">Admin</div>
				</div>
				<nav>
					<ul>
						<li>
							<Link to={'/dashboard'}>Dashboard</Link>
						</li>
						<li>
							<Link to={'/users'}>User</Link>
						</li>

					</ul>
				</nav>
			</div>
		</>
	);
};
