import React, { Component } from 'react';

class CreateTask extends Component {
	constructor() {
		super();

		this.state = {
			task: {
				title: '',
				description: '',
				category: 'delivery'
			}
		}
	}

	updateTask(e) {
		e.preventDefault();
		let updated = Object.assign({}, this.state.task);
		updated[e.target.id] = e.target.value;

		this.setState({
			task: updated
		});
	}

	submitTask(e) {
		e.preventDefault();
		console.log(JSON.stringify(this.state.task));
		this.props.onSubmitTask(this.state.task);
	}

	render() {
		return (
			<div>
				<h2>Create Task</h2>
				<input onChange={this.updateTask.bind(this)} id="title" type="text" placeholder="Title" />
				<br />
				<input onChange={this.updateTask.bind(this)} id="description" type="text" placeholder="Description" />
				<br />
				<select onChange={this.updateTask.bind(this)} id="category">
					<option value="delivery">Delivery</option>
					<option value="dog walking">Dog Walking</option>
					<option value="house cleaning">House Cleaning</option>
				</select>
				<br />
				<button onClick={this.submitTask.bind(this)}>Submit</button>
			</div>
		);
	}
}

export default CreateTask;