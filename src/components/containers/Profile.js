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
					In order to post tasks, you must send a correctly formatted text
					message to the Tasks Manager Number. You can find the number on the right side of the screen
					after you have logged in. Once your task has been posted, other users can see your requests, and 
					decide if they want to respond. You will receive a text notification if any users respond to your task.
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
		profiles: state.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProfile: (id) => dispatch(actions.fetchProfile(id))
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile);