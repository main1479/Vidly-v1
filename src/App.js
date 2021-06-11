import './App.css';
import Movies from './components/Movies';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/404';
import Navbar from './components/navbar';
import Coustomers from './components/coustomers';
import Rentals from './components/rental';
import LoginForm from './components/loginForm';
import RegisterForm from './components/register';
import Logout from './components/logout';
import MovieForm from './components/movieForm';

import 'react-toastify/dist/ReactToastify.css';
import auth from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';
import Profile from './components/profile';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}
	render() {
		const { user } = this.state;
		return (
			<React.Fragment>
				<ToastContainer />
				<Navbar user={user} />
				<main className="container">
					<Switch>
						<ProtectedRoute path="/profile" component={Profile}/>
						<Route path="/register" component={RegisterForm} />
						<Route path="/login" component={LoginForm} />
						<Route path="/logout" component={Logout} />
						<Route path="/rentals" component={Rentals} />
						<Route path="/coustomers" component={Coustomers} />
						<ProtectedRoute path="/movies/:id" component={MovieForm} />
						<Route path="/movies/" exact render={(props) => <Movies {...props} user={user} />} />
						<Route path="/notFound" component={NotFound} />
						<Redirect from="/" exact to="/movies" />
						<Redirect to="notFound" />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
