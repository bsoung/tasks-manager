import React, { Component } from 'react';
import { CreateTask, Authenticate } from '../view';
import { connect} from 'react-redux';
import actions from '../../actions';
import { Link, browserHistory } from 'react-router';

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
		
		this.props.login(credentials)
		.then(response => {
			swal("Hey there!",
				"Welcome back. Refer to the Help button located in the user panel for more information."
				,"success");
		})
		.catch(err => {
			sweetAlert("Oops...", `${err.message}`, "error");
			console.error(err.message);	
		});
	}

	onLogout(e) {
		e.preventDefault();

		this.props.logoutAccount()
		.then(response => {
			swal("Bye :(","You have successfully logged out!","success");
		})
		.catch(err => {
			sweetAlert("Oops...", `${err.message}`, "error");
			console.error(err.message);
		});
	}

	register(credentials) {

		this.props.register(credentials)
		.then(response => {
			swal("Congrats :)",
			"You're registered! Refer to the Help button located in the user panel for more information."
			,"success");
		})
		.catch(err => {
			sweetAlert("Oops...", `${err.message}`, "error");
			console.error(err.message);
		});
	}

	onClickNumberInfo(e) {
		e.preventDefault();

		swal({
		  title: "Important",
		  text: "<div><strong>The Tasks Manager number is 917-382-5282</strong>.</div> <hr /> <div style='text-align: left'>Send all requests to number with the following format:</div> <div style='color: red'>Name of task. Category of task. Description of task.</div> <div style='text-align: left'>The category part of the text needs to be the following: 'delivery'\, 'dog walking'\, or 'house cleaning'</div> <div style='color: green'>Example: 'Walk the puppy. Dog Walking. Could someone walk my poodle?'</div> <hr /> <div style='text-align: left'>",
		  html: true
		});

	}

	onClickToTasks(e) {
		e.preventDefault();

		browserHistory.push('/');
	}

	render() {
		return (
			<div style={{padding: 24}}>
				{
					this.props.user == null ?
					<Authenticate 
						onLogin={this.login.bind(this)} 
						onRegister={this.register.bind(this)} 
					/>
					: <div>
						<h2>Hello {this.props.user.username}</h2>

						<button style={{marginBottom: 24}}>
							<Link style={{textDecoration: 'none'}} to={"/profile/" + this.props.user.id}>Profile</Link>
						</button>

						<button onClick={this.onClickToTasks.bind(this)} style={{marginBottom: 24}}>
							Tasks
						</button>

						<button style={{display: 'flex', marginBottom: 24}} onClick={this.onLogout.bind(this)}>Logout</button>

						<button onClick={this.onClickNumberInfo.bind(this)}>Help</button>
					  </div>	
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
		checkCurrentUser: () => dispatch(actions.checkCurrentUser()),
		logoutAccount: () => dispatch(actions.logoutAccount())

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);








