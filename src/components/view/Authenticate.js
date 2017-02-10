import React, { Component } from 'react';

class Authenticate extends Component {
	constructor() {
		super();

		// TODO: should go in container
		this.state = {
			credentials: {
				username: '',
				phone: '',
				email: '',
				password: ''
			}
		}
	}

	updateCredentials(field, e) {
		// console.log('updateCredentials: ' + field + ' == ' + e.target.value);
		let updated = Object.assign({}, this.state.credentials);
		updated[field] = e.target.value;
		this.setState({
			credentials: updated
		});
	}

	register(e) {
		// console.log('register: ' + JSON.stringify(this.state.credentials));
		this.props.onRegister(this.state.credentials);
	}

	login(e) {
		// console.log('login: ' + JSON.stringify(this.state.credentials));
		this.props.onLogin(this.state.credentials);
	}

	render() {
		return (
			<div>
				<h3>Sign Up</h3>
				<input onChange={this.updateCredentials.bind(this, 'username')} type="text" placeholder="Username" /><br />
				<input onChange={this.updateCredentials.bind(this, 'phone')} type="text" placeholder="Phone" /><br />
				<input onChange={this.updateCredentials.bind(this, 'email')} type="text" placeholder="Email" /><br />
				<input onChange={this.updateCredentials.bind(this, 'password')} type="text" placeholder="Password" /><br />
				<button onClick={this.register.bind(this)}>Join</button>

				<h3>Log In</h3>
				<input onChange={this.updateCredentials.bind(this, 'email')} type="text" placeholder="Email" /><br />
				<input onChange={this.updateCredentials.bind(this, 'password')} type="text" placeholder="Password" /><br />
				<button onClick={this.login.bind(this)}>Login</button>
			</div>
		);
	}
}

export default Authenticate;