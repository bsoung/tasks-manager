import constants from '../constants';
import { APIManager } from '../utils';
import _ from 'lodash';

const getRequest = (path, params, actionType, cb) => {
	return (dispatch) => 
		// returns a promise
		APIManager
		.get(path, params)
		.then(response => {
			const payload = response.results || response.result || response.user;

			dispatch({
				type: actionType,
				payload: payload,
				params: params
			});

			if (_.isFunction(cb)) {
				cb(payload);
			}

			return response;
		})
		.catch(err => {
			console.log(err.message);
			throw err;
		});
}

const postRequest = (path, params, actionType) => {
	return (dispatch) => 
		APIManager
		.post(path, params)
		.then(response => {
			const payload = response.results || response.result || response.user;
			
			dispatch({
				type: actionType,
				payload: payload
			});

			return response;
		})
		.catch(err => {
			console.log(err.message);
			throw err;
		});
}

function setProfileLoading(bool) {
	return {
		type: constants.PROFILE_LOADING_SET,
		payload: bool
	}
}

export default {
	fetchProfile: (id) => {
		return (dispatch) => {
			dispatch(setProfileLoading(true));
			return dispatch(
				getRequest('/api/profile/'+id, null, constants.PROFILE_RECEIVED, () => {
					dispatch(setProfileLoading(false));
				})
			)	

		}

	},

	registerAccount: (credentials) => {
		return (dispatch) => {
			return dispatch(postRequest('/account/register', credentials, constants.PROFILE_CREATED));
		}
	},

	loginAccount: (credentials) => {
		return (dispatch) => {
			return dispatch(postRequest('/account/login', credentials, constants.USER_LOGGED_IN));
		}
	},

	logoutAccount: () => {
		return (dispatch) => {
			return dispatch(getRequest('/account/logout', null, constants.USER_LOGGED_OUT));
		}
	},

	checkCurrentUser: () => {
		return (dispatch) => {
			return dispatch(getRequest('/account/currentuser', {}, constants.USER_LOGGED_IN));
		}
	},

	fetchTasks: () => {
		return (dispatch) => {
			return dispatch(getRequest('/api/task', null, constants.TASKS_SET));
		}
	},

	submitTask: (params) => {
		return (dispatch) => {
			return dispatch(postRequest('/api/task', params, constants.TASK_ADD));
		}
	},

	submitMessage: (params) => {
		return (dispatch) => {
			return dispatch(postRequest('/api/message', params, constants.MESSAGE_CREATED));
		}
	},

	fetchMessages: (params) => {
		return (dispatch) => {
			return dispatch(getRequest('/api/message', params, constants.MESSAGES_RECEIVED));
		}
	},

	notify: (params) => {
		return (dispatch) => {
			return dispatch(postRequest('/twilio/notify', params, null));
		}
	},


	tasksReceived: (tasks) => {
		return {
			type: constants.TASKS_RECEIVED,
			payload: tasks
		}
	},

	selectCategory: (category) => {
		return {
			type: constants.CATEGORY_SELECTED,
			payload: category
		}
	}



}




