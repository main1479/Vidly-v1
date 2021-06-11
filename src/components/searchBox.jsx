import React from 'react';

const SearchBox = ({ value, onChange }) => {
	return (
		<input
			onChange={(e) => onChange(e.currentTarget.value)}
			value={value}
			type="text"
			placeholder="Search..."
			className="form-control"
		/>
	);
};

export default SearchBox;
