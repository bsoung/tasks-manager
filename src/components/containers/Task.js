import React, { Component } from 'react';
import { connect} from 'react-redux';
import actions from '../../actions';
import { TextUtils, DateUtils } from '../../utils';
import Time from 'react-time';
import { Link } from 'react-router';

class Task extends Component {
	constructor() {
		super();

		this.state = {
			message: {
				text: ''
			}
		};
	}

	componentDidMount() {
		const taskId = this.props.params.id;

		if (this.props.message[taskId] != null) {
			return;
		}

		if (!this.props.task) {
			this.props.fetchTasks();
		}

		this.updateMessages();
	}

	// refreshing comments section
	updateMessages(seconds) {
		this.props.fetchMessages({task: this.props.params.id})
		.then(response => {

			// wrong path, bail out;
			if (this.props.router.location.pathname != '/task/'+this.props.params.id) {
				return;
			}

			setTimeout(() => {
				this.updateMessages();

			}, 3*1000)
		})
		.catch(err => {
			console.log(err);
		});
	}

	onSubmitMessage(e) {
		e.preventDefault();

		let updated = Object.assign({}, this.state.message);

		const user = this.props.user;
		const username = user.username || 'a user';
		const userId = user.id;

		updated['profile'] = {
			id: user.id,
			username
		};

		updated['task'] = this.props.params.id;

		const taskId = this.props.params.id;
		const task = this.props.task;

		this.props.submitMessage(updated)
			.then(response => {
				// send a notification to the task creator
				const params = {
					recipient: task.profile.id,
					text: updated.text,
					username,
					userId
				}

				return this.props.notify(params);
			})
			.then(response => {
				swal("Message Sent",`You have sent a text message!`,"success");
			})
			.catch(err => {
				console.error(err, 'err');
			});
	}

	updateMessage(e) {
		let updated = Object.assign({}, this.state.message);
		updated['text'] = e.target.value;

		this.setState({
			message: updated
		});
	}

	render() {
		const taskId = this.props.params.id;
		const task = this.props.task;
		const messages = this.props.message[taskId];

		if (!task) {
			return (
				<div>
					Loading...
				</div>
			)
		}

		return (

			<section style={{paddingTop: 24}}>
				<header className="major">
					<h2 style={{border: 'none', marginBottom: 0}}>{ task.title }</h2>
				</header>

				<div className="posts">
					<article style={{background: '#f9f9f9', border: '1px solid #ddd', padding: 16}}>
						Category is <strong>{ TextUtils.capitalize(task.category) }</strong> 
						<br />
						Posted by <strong>{ task.profile.username }</strong> {DateUtils.formattedDate(task.timestamp)}
						<br />
					
						<hr />
						
						<p>{ task.description }</p>
					</article>
				</div>

				<h3>Replies</h3>

				{
					messages == null 
					? '' 
					: messages.map(message => {
						return (

							<div className="posts" key={message.id}>
								<article style={{background: '#f9f9f9', border: '1px solid #ddd', padding: 16}}>
									<br />
									Posted by <strong><Link to={'/profile/'+message.profile.id}>{message.profile.username}</Link></strong> {DateUtils.formattedDate(task.timestamp)}
									<br />
								
									<hr />
									
									<p>{message.text}</p>
									<div>{DateUtils.formattedDate(message.timestamp)}</div>
								</article>
							</div>

						)
						
					})
				}

				{ 
					(this.props.user == null) 
					? <h4>Please login or register to reply.</h4>
					: <div>
						 <h3>Reply</h3>
						 <textarea onChange={this.updateMessage.bind(this)} placeholder="Enter Message to Respond"></textarea>
						 <br />
						 <button onClick={this.onSubmitMessage.bind(this)}>Submit</button>
					  </div>
				}

			</section>

		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		task: state.tasks.tasks[props.params.id],
		user: state.account.user,
		message: state.message
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		submitMessage: (params) => dispatch(actions.submitMessage(params)),
		notify: (params) => dispatch(actions.notify(params)),
		fetchMessages: (params) => dispatch(actions.fetchMessages(params)),
		fetchTasks: () => dispatch(actions.fetchTasks())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);








