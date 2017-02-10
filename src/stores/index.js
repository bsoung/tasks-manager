import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { taskReducer, accountReducer } from '../reducers';

let store;

export default {
	configureStore: () => {
		const reducers = combineReducers({
			task: taskReducer,
			account: accountReducer
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
