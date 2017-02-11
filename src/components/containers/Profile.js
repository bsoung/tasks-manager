import React, { Component } from 'react';
import { CreateTask, Authenticate } from '../view';
import { connect} from 'react-redux';
import actions from '../../actions';

class Profile extends Component {
	componentDidMount() {
		
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
		user: state.account.user
	}
}



export default connect(mapStateToProps)(Profile);