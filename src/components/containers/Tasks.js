import React, { Component } from 'react';
import { Authenticate } from '../view';
import { connect} from 'react-redux';
import actions from '../../actions';
import { Link } from 'react-router';
import { DateUtils } from '../../utils';
import _ from 'lodash';

class Tasks extends Component {
	constructor() {
		super();

		this.getTasks = this.getTasks.bind(this);
	}

	componentDidMount() {
		this.getTasks();

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

	componentDidUpdate() {
		this.getTasks();
	}

	getTasks() {
		if (this.props.tasks.length) {
			return;
		}

		this.props.fetchTasks();
	}

	createTask(task) {
		this.props.submitTask(task)
			.then(result => {
			})
			.catch(err => {
				alert(err);
			})
		
	}

	login(credentials) {
		
		this.props.login(credentials)
		.then(response => {
			swal("Hey there!",
				"Welcome back. Refer to the Tasks Manager button located in the user panel for more information."
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
				"You're registered! Refer to the Tasks Manager button located in the user panel for more information."
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
		  text: "<div><strong>The Tasks Manager number is 917-382-5282</strong>.</div> <hr /> <div style='text-align: left'>Send all requests to number with the following format:</div> <div style='color: red'>Name of task. Category of task. Description of task.</div> <div style='text-align: left'>The category part of the text needs to be the following: 'delivery'\, 'dog walking'\, or 'house cleaning'</div> <div style='color: green'>Example: 'Walk the puppy. Dog Walking. Could someone walk my poodle?'</div> <hr /> <div style='text-align: left'>",
		  html: true
		});

	}

	render() {

		const taskList = this.props.tasks;

		return (		
				<section id="banner">		
					<div className="content">

						<h3>Current Tasks</h3>

						{
							taskList == null 
							? null 
							: taskList.map((task) => {
								const username = task.profile.username || 'anonymous';
								return (
								
									<div key={task.id} className="box" style={{marginRight: 40}}>
										<Link to={'/task/' + task.id}>
											<h3>{task.title}</h3>
										</Link>

										<span style={ localStyle.detailText }>{ DateUtils.formattedDate(task.timestamp) }</span>
											
										<span style={ localStyle.pipe }>|</span>

										<Link to={"/profile/" + task.profile.id}>
											<span style={ localStyle.detailText }>{ username }</span>
										</Link>

										<Link to={'/task/' + task.id}>
											{task.description}
										</Link>
									</div>
								)
							})
						}
					</div>

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

							<button style={{marginBottom: 24}} onClick={this.onClickNumberInfo.bind(this)}>Tasks Manager Number</button>
						  </div>	
					}
		
				</section>
			

		);
	}
}

const localStyle = {
	detailText: {
		float: 'right'
	},
	pipe: {
		float: 'right',
		marginLeft: 12,
		marginRight: 12
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: _.sortBy(
			_.filter(state.tasks.tasks, task => task.category == state.tasks.selectedCategory),
			task => state.tasks.tasksOrder.indexOf(task.id)
		),

		selectedCategory: state.tasks.selectedCategory,
		user: state.account.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchTasks: () => dispatch(actions.fetchTasks()),
		tasksReceived: (tasks) => dispatch(actions.tasksReceived(tasks)),
		submitTask: (params) => dispatch(actions.submitTask(params)),
		register: (credentials) => dispatch(actions.registerAccount(credentials)),
		login: (credentials) => dispatch(actions.loginAccount(credentials)),
		logoutAccount: () => dispatch(actions.logoutAccount()),
		checkCurrentUser: () => dispatch(actions.checkCurrentUser())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);




