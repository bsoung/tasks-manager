import React, { Component } from 'react';
import { CreateTask, Authenticate } from '../view';
import { connect} from 'react-redux';
import actions from '../../actions';

class Profile extends Component {
	componentDidMount() {
		const id = this.props.params.id;
		this.props.fetchProfile(id);
	}

	render() {
		return (
			<div>
				Profile Container
				<h2>{this.props.user.username}'s profile</h2>

				{this.props.user.email}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		message: state.message,
		user: state.account.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: (id) => dispatch(actions.fetchProfile(id))
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile);