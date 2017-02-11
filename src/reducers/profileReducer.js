import constants from '../constants';

let initialState = {

}

export default (state = initialState, action) => {
	let updated = Object.assign({}, state);

	switch (action.type) {
		case constants.PROFILE_RECEIVED:
			let profile = action.payload;
			updated[profile.id] = profile;

			return updated;

		default:
			return state;
	}
}