import constants from '../constants';

let initialState = {
	user: null

}

export default (state = initialState, action) => {
	let updated = Object.assign({}, state);

	switch (action.type) {
		case constants.PROFILE_CREATED:
			
			updated['user'] = action.payload;
			return updated;

		case constants.USER_LOGGED_IN:

			updated['user'] = action.payload;
			return updated;

		default:
			return state; //
	}
}