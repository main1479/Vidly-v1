import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import * as userService from '../services/userService';
import auth from './../services/authService';

class RegisterForm extends Form {
	state = {
		data: {
			username: '',
			password: '',
			name: '',
		},
		errors: {},
	};

	schema = {
		username: Joi.string().trim().email().required().label('Username'),
		password: Joi.string().trim().min(5).required().label('Password'),
		name: Joi.string().trim().required().label('Name'),
	};

	doSubmit = async () => {
		try {
			const { headers } = await userService.register(this.state.data);
			const jwt = headers['x-auth-token'];
			auth.loginWithJwt(jwt); 
			window.location = '/';
		} catch (err) {
			if (err.response && err.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = err.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<div className="mt-3">
				<h1 className="mb-3">Register</h1>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
