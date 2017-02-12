import React, { Component } from 'react';
import { CreateTask, Authenticate } from '../view';
import { connect} from 'react-redux';
import actions from '../../actions';
import { Link } from 'react-router';

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
				"Welcome back. As a reminder, the Tasks Manager number is 917-382-5282. Please send all task requests to that number using this format: Name of task. Category of task. Description. Refer to the Tasks Manager button located in the user panel for more information."
				,"success");
		})
		.catch(err => {
			alert(err.message);	
		});
	}

	onLogout(e) {
		e.preventDefault();

		this.props.logoutAccount()
		.then(response => {
			swal("Bye :(","You have successfully logged out!","success");
		})
		.catch(err => {
			alert(err.message);
		});
	}

	register(credentials) {

		this.props.register(credentials)
		.then(response => {
			swal("Congrats :)",
			"You're registered! As a reminder, the Tasks Manager number is 917-382-5282. Please send all task requests to that number using this format: Name of task. Category of task. Description. Refer to the Tasks Manager button located in the user panel for more information."
			,"success");
		})
		.catch(err => {
			alert(err.message);
		});
	}

	onClickNumberInfo(e) {
		e.preventDefault();

		swal({
		  title: "Important",
		  text: "<div><strong>The Tasks Manager number is 917-382-5282</strong>.</div> <hr /> <div style='text-align: left'>Send all task requests to this number using the following format:</div> <div style='color: red'>Name of task. Category of task. Description of task.</div> <div style='text-align: left'>The category part of the text needs to be the following: 'delivery'\, 'dog walking'\, or 'house cleaning'</div> <div style='color: green'>Example: 'Walk the puppy. Dog Walking. Could someone walk my poodle?'</div> <hr /> <div style='text-align: left'>You should receive a text confirmation after sending the task. Your task will also appear in the appropriate section on this website. If your category does not fit the required categories, it will appear under the 'misc' section. You will also be notified via text if any users respond to your task.</div>",
		  html: true
		});

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
							<Link style={{textDecoration: 'none'}} to={"/profile/" + this.props.user.id}>Profile page</Link>
						</button>

						<button style={{display: 'flex', marginBottom: 24}} onClick={this.onLogout.bind(this)}>Logout</button>

						<button onClick={this.onClickNumberInfo.bind(this)}>Tasks Manager Number</button>
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








