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

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.id != this.props.params.id && nextProps.params.id) {
			this.props.fetchProfile(nextProps.params.id);
		}
	}

	render() {
		const { loading, profiles, params } = this.props;
		const profile = profiles[params.id];

		if (loading) {
			return (
				<div>Loading...</div>
			)
		}

		return (profile == null) 
			? <div>Not Found</div> 
			: (
				<section>
					<header className="major">
						<h2 style={{textAlign: 'center', borderBottom: 'none'}}>{profile.username}'s contact info</h2>
					</header>
					<strong>
					Welcome to Tasks Manager!
					</strong>
					<br />
					<p>
					Thanks for checking out Tasks Manager! This is a project exploring the awesomeness of the Twilio API with React and Redux.
					The basic concept is to have a "task board" where users post tasks they want via text messaging. Other users can reply
					to these tasks. Once a user replies, the original task poster will receive a text message update. This would be a pretty cool 
					tool for a group of friends, roommates, or family members.
					</p>
					<h3>Email</h3>
					<ul className="contact">
						<li className="fa-envelope-o"><a>{profile.email}</a></li>
					</ul>
				</section>
			);
		
	}
		
}


const mapStateToProps = (state) => {
	return {
		profiles: state.profile,
		loading: state.profile.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: (id) => dispatch(actions.fetchProfile(id))
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile);