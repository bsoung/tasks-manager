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
		let profile = this.props.profiles;

		if (profile == null) {
			return <div>Not Found</div>

		} else if (profile[this.props.params.id] == null){
			return <div>Not Found</div>

		} else {

			profile = profile[this.props.params.id];

			return (
				<div>
					Profile Container
					<h2>{profile.username}'s profile</h2>

					{profile.email}     
				</div>
			);
		}
		
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