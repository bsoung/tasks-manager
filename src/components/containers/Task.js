import React, { Component } from 'react';
import { connect} from 'react-redux';
import actions from '../../actions';
import { TextUtils, DateUtils } from '../../utils';
import Time from 'react-time';

class Task extends Component {
	constructor() {
		super();

		this.state = {
			message: {
				text: ''
			}
		};
	}

	onSubmitMessage(e) {
		e.preventDefault();

		let updated = Object.assign({}, this.state.message);

		const user = this.props.user;

		updated['profile'] = {
			id: user.id,
			username: user.username
		};

		updated['task'] = this.props.params.id;

		const taskId = this.props.params.id;
		const task = this.props.tasks[taskId];

		this.props.submitMessage(updated)
			.then(response => {
				// send a notification to the task creator
				const params = {
					recipient: task.profile.id,
					text: updated.text,
					sender: user.username
				}

				return this.props.notify(params);
			})
			.then(response => {
				// alert('Thanks for replying!');
				swal("Message Sent",`You have sent a text message to ${params.sender}!`,"success");
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
	//
	render() {
		const taskId = this.props.params.id;
		const task = this.props.tasks[taskId];

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

const mapStateToProps = (state) => {
	return {
		tasks: state.task,
		user: state.account.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		submitMessage: (params) => dispatch(actions.submitMessage(params)),
		notify: (params) => dispatch(actions.notify(params))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);








