import React, { Component } from 'react';
import { CreateTask, Authenticate } from '../view';
import { connect} from 'react-redux';
import actions from '../../actions';

class Profile extends Component {
	componentDidMount() {
		const id = this.props.params.id;

		if (this.props.profiles[id] != null) {
			return;
		}

		this.props.fetchProfile(id);
	}

	render() {
		const profile = this.props.profiles[this.props.params.id];

		return (profile == null) ? <div>Not Found</div> : (
			<div>
				Profile Container
				<br />
				<h2>{profile.username}'s profile</h2>
				<br />
				{profile.email}     
			</div>
		);
		
	}
		
}


const mapStateToProps = (state) => {
	return {
		profiles: state.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: (id) => dispatch(actions.fetchProfile(id))
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile);