import React, { Component } from 'react';
import { CreateTask, Authenticate } from '../view';
import { connect} from 'react-redux';
import actions from '../../actions';

class Account extends Component {
	componentDidMount() {
		// check current user
		if (this.props.user != null) {
			return;
		}

		this.props.checkCurrentUser()
			.then((response) => {

			})
			.catch(err => {
				console.log(err.message);
			})
		
	}

	login(credentials) {
		console.log('login: ' + JSON.stringify(credentials));
		this.props.login(credentials)
		.then(response => {

		})
		.catch(err => {
			alert(err.message);	
		})
	}

	register(credentials) {
		console.log('login: ' + JSON.stringify(credentials));
		this.props.register(credentials);
	}

	render() {
		return (
			<div style={{padding: 24}}>
				<h2>Account</h2>
				{
					this.props.user == null ?
					<Authenticate 
						onLogin={this.login.bind(this)} 
						onRegister={this.register.bind(this)} 
					/>
					: <h2>Hello {this.props.user.username}</h2>
				}
				
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.account.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (credentials) => dispatch(actions.registerAccount(credentials)),
		login: (credentials) => dispatch(actions.loginAccount(credentials)),
		checkCurrentUser: () => dispatch(actions.checkCurrentUser())

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);








