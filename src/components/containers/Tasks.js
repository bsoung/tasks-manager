import React, { Component } from 'react';
import { Authenticate } from '../view';
import { connect} from 'react-redux';
import actions from '../../actions';
import { Link } from 'react-router';

class Tasks extends Component {
	constructor() {
		super();

		this.getTasks = this.getTasks.bind(this);
	}

	getTasks() {
		if (this.props.tasks[this.props.tasks.selectedCategory] != null) {
			return;
		}

		this.props.fetchTasks({category: this.props.tasks.selectedCategory})
		.then(results => {

		})
		.catch(err => {
			alert(err);
		});
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

	createTask(task) {
		this.props.submitTask(task)
			.then(result => {
			})
			.catch(err => {
				alert(err);
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
		const taskList = this.props.tasks[this.props.tasks.selectedCategory];
		return (		
				<section id="banner">		
					<div className="content">

						<h3>Current Tasks</h3>

						{
							taskList == null ? null :
								taskList.map((task) => {
									return (
										<div key={task.id} className="box">
											<Link to={'/task/' + task.id}>
												<h3>{task.title}</h3>
											</Link>

											<Link to={'/task/' + task.id}>
												{task.description}
											</Link>
										</div>
									)
								})
						}

						
					</div>
					<Authenticate 
						onLogin={this.login.bind(this)} 
						onRegister={this.register.bind(this)} 
					/>
		
				</section>
			

		);
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: state.task
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchTasks: (params) => dispatch(actions.fetchTasks(params)),
		tasksReceived: (tasks) => dispatch(actions.tasksReceived(tasks)),
		submitTask: (params) => dispatch(actions.submitTask(params)),
		register: (credentials) => dispatch(actions.registerAccount(credentials)),
		login: (credentials) => dispatch(actions.loginAccount(credentials)),
		checkCurrentUser: () => dispatch(actions.checkCurrentUser())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);




