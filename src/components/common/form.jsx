import { Component } from 'react';

import Joi from 'joi-browser';
import Input from './input';
import SelectInput from './selectInput';

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);

		return error ? error.details[0].message : null;
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};

	validate = () => {
		const options = { abortEarly: false };
		const result = Joi.validate(this.state.data, this.schema, options);
		if (!result.error) return null;
		const errors = {};
		for (let item of result.error.details) errors[item.path[0]] = item.message;

		return errors;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	renderInput = (name, label, type = 'text', placeholder = '') => {
		const { data, errors } = this.state;

		return (
			<Input
				type={type}
				placeholder={placeholder}
				name={name}
				value={data[name]}
				label={label}
				error={errors[name]}
				onChange={this.handleChange}
			/>
		);
	};

	renderSelectInput = (name, label, options) => {
		const { data, errors } = this.state;

		return (
			<SelectInput
				name={name}
				options={options}
				value={data[name]}
				label={label}
				error={errors[name]}
				onChange={this.handleChange}
			/>
		);
	};

	renderButton = (label) => {
		return (
			<button disabled={this.validate()} className="btn btn-primary">
				{label}
			</button>
		);
	};
}

export default Form;
