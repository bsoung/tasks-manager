import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { taskReducer, accountReducer, messageReducer, profileReducer } from '../reducers';

let store;

export default {
	configureStore: () => {
		const reducers = combineReducers({
			tasks: taskReducer,
			account: accountReducer,
			message: messageReducer,
			profile: profileReducer
		});

		store = createStore(
			reducers,
			applyMiddleware(thunk)
		)

		return store;
	},

	currentStore: () => {
		return store;
	}
}
