import React from 'react';

export const Header = () => {
	return (
		<div id='Header'>
			<div className="logo">
				<span>Admin Panel</span>
			</div>
			<div className="header-nav">
				<div className="menu-button">
					<span>☰</span>
				</div>
				<div className="user-action">
					<div className='user-menu'>
						<div className="label">👤</div>
						<div className="actions">
							<ul>
								<li>Profile</li>
								<li>Change Password</li>
								<li>Logout</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
