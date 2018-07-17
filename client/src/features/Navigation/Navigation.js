import React from 'react';

const Navigation = ({ signOut }) => {
	return (
		<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
			<a onClick={signOut} className="f3 link dim black underline pa3 pointer">
				Sign Out
			</a>
		</nav>
	);
};

export default Navigation;
