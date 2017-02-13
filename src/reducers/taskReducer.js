import constants from '../constants';
import _ from 'lodash';

let initialState = {
	selectedCategory: 'delivery',
	categories: [
		'misc',
		'delivery',
		'dog walking',
		'house cleaning'
	],
	tasks: {},
	tasksOrder: []

}

export default (state = initialState, action) => {
	let updated = _.merge({}, state);

	switch (action.type) {
		case constants.TASKS_SET:

			updated.tasksOrder = [];

			action.payload.forEach(task => {
				updated.tasks[task.id] = task;
				updated.tasksOrder.push(task.id);
			});

			return updated;

		case constants.TASK_ADD:

			updated.tasks[action.payload.id] = action.payload

			updated.tasksOrder.unshift(action.payload.id);

			return updated;

		case constants.CATEGORY_SELECTED:

			updated.selectedCategory = action.payload;

			return updated;

		default:
			return state;
	}
}