import constants from '../constants';
import { APIManager } from '../utils';

const getRequest = (path, params, actionType) => {
	return (dispatch) => 
		// returns a promise
		APIManager
			.get(path, params)
			.then(response => {
				// console.log("GET response", JSON.stringify(response));
				const payload = response.results || response.result || response.user;

				dispatch({
					type: actionType,
					payload: payload,
					params: params
				});

				return response;
			})
			.catch(err => {
				console.log(err.message);
				throw err;
			});
}

const postRequest = (path, params, actionType) => {
	return (dispatch) => 
		// returns a promise
		APIManager
			.post(path, params)
			.then(response => {
				// 	console.log("POST response", JSON.stringify(response));
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

export default {
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

	checkCurrentUser: () => {
		return (dispatch) => {
			return dispatch(getRequest('/account/currentuser', {}, constants.USER_LOGGED_IN));
		}
	},

	fetchTasks: (params) => {
		return (dispatch) => {
			return dispatch(getRequest('/api/task', params, constants.TASKS_RECEIVED));
		}
	},

	submitTask: (params) => {
		return (dispatch) => {
			return dispatch(postRequest('/api/task', params, constants.TASK_CREATED));
		}
	},

	submitMessage: (params) => {
		return (dispatch) => {
			return dispatch(postRequest('/api/message', params, constants.MESSAGE_CREATED));
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




