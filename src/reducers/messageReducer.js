import constants from '../constants';

let initialState = {

}

export default (state = initialState, action) => {
	let updated = Object.assign({}, state);

	switch (action.type) {
		case constants.MESSAGES_RECEIVED:
		
			let taskId = action.params.task;
			updated[taskId] = action.payload
			return updated;

		default:
			return state;
	}
}