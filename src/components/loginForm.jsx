import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { Redirect } from 'react-router';

class LoginForm extends Form {
	state = {
		data: {
			username: '',
			password: '',
		},
		errors: {},
	};

	schema = {
		username: Joi.string().trim().required().label('Username'),
		password: Joi.string().trim().required().label('Password'),
	};

	doSubmit = async () => {
		try {
			const { username, password } = this.state.data;
			await auth.login(username, password);
			const { state } = this.props.location;

			window.location = state ? state.from.pathname : '/';
		} catch (err) {
			if (err.response && err.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = err.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		if (auth.getCurrentUser()) return <Redirect to="/" />;
		return (
			<div className="mt-3">
				<h1 className="mb-3">Login</h1>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Login')}
				</form>
			</div>
		);
	}
}

export default LoginForm;
