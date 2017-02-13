import constants from '../constants';

let initialState = {
	loading: false
}

export default (state = initialState, action) => {
	let updated = Object.assign({}, state);

	switch (action.type) {
		case constants.PROFILE_RECEIVED:
			let profile = action.payload;
			updated[profile.id] = profile;

			return updated;

		case constants.PROFILE_LOADING_SET:
			updated.loading = action.payload;

			return updated;

		default:
			return state;
	}
}