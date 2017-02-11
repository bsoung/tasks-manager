import React, { Component } from 'react';
import { Authenticate } from '../view';
import { connect} from 'react-redux';
import actions from '../../actions';
import { Link } from 'react-router';
import { DateUtils } from '../../utils';

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
									const username = task.profile.username || 'anonymous';
									return (
									
										<div key={task.id} className="box">
											<Link to={'/task/' + task.id}>
												<h3>{task.title}</h3>
											</Link>

											<span style={ localStyle.detailText }>{ DateUtils.formattedDate(task.timestamp) }</span>
												
											<span style={ localStyle.pipe }>|</span>

											<span style={ localStyle.detailText }>{ username }</span>

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




