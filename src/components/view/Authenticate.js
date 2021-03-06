import React, { Component } from 'react';

class Authenticate extends Component {
	constructor() {
		super();

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
		e.preventDefault();

		let updated = Object.assign({}, this.state.credentials);
		updated[field] = e.target.value;
		
		this.setState({
			credentials: updated
		});
	}

	isPhoneNumberValid(numbers) {
		const correctLength = 10;
		const validNumbers = '1234567890'.split('');

		if (numbers.length !== correctLength) {
			return false;
		}

		for (let i = 0; i < numbers.length; i++) {
			if (validNumbers.indexOf(numbers[i]) == -1) {
				return false;
			}
		}

		return true;
	}

	register(e) {
		e.preventDefault();

		if (this.state.credentials.username.length == 0) {
			swal("Oops...","You forgot the username!","error");
			return;
		}

		if (this.state.credentials.phone.length == 0) {
			swal("Oops...","You forgot the phone number!","error");
			return;
		}

		if (this.state.credentials.email.length == 0) {
			swal("Oops...","You forgot the email!","error");
			return;
		}

		if (this.state.credentials.password.length == 0) {
			swal("Oops...","You forgot the password!","error");
			return;
		}

		const phoneNumber = this.state.credentials.phone;
		const correctNumber = this.isPhoneNumberValid(phoneNumber);

		if (!correctNumber) {
			swal("Oops...","You must enter a valid phone number!","error");
			return;
		} 

		this.props.onRegister(this.state.credentials);
	}

	login(e) {
		e.preventDefault();

		if (this.state.credentials.email.length == 0) {
			swal("Oops...","You forgot the email!","error");
			return;
		}

		if (this.state.credentials.password.length == 0) {
			swal("Oops...","You forgot the password!","error");
			return;
		}

		this.props.onLogin(this.state.credentials);

	}


	render() {
		return (
			<div>
				<h3>Sign Up</h3>
				<input onChange={this.updateCredentials.bind(this, 'username')} type="text" placeholder="Username" /><br />
				<input onChange={this.updateCredentials.bind(this, 'phone')} type="text" placeholder="Phone" /><br />
				<input onChange={this.updateCredentials.bind(this, 'email')} type="text" placeholder="Email" /><br />
				<input onChange={this.updateCredentials.bind(this, 'password')} type="password" placeholder="Password" /><br />
				<button style={{marginBottom: 24}} onClick={this.register.bind(this)}>Join</button>

				<h3>Log In</h3>
				<input onChange={this.updateCredentials.bind(this, 'email')} type="text" placeholder="Email" /><br />
				<input onChange={this.updateCredentials.bind(this, 'password')} type="password" placeholder="Password" /><br />
				<button style={{marginBottom: 24}} onClick={this.login.bind(this)}>Login</button>
			</div>
		);
	}
}

export default Authenticate;