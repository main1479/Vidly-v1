import React from 'react';

const SelectInput = ({ name, label, error, options, ...rest }) => {
	return (
		<div className="form-group mb-3">
			<label className="form-label" htmlFor={name}>
				{label}
			</label>
			<select {...rest} name={name} className="form-select form-control" id={name}>
				<option value=""/>
				{options.map(option=> <option key={option._id} value={option._id}>{option.name}</option>)}
			</select>
         {error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default SelectInput;
