var Task = require('../models/Task');

module.exports = {
	get: function(params, isRaw){
		return new Promise(function(resolve, reject){
			var filters = {
				sort: {timestamp: -1}
			}

			Task.find(params, null, filters, function(err, tasks){
				if (err){
					reject(err);
					return;
				}

				if (isRaw == true) {
					resolve(tasks);
				}

				else {
					var list = [];
					tasks.forEach(function(task){
						list.push(task.summary());
					})

					resolve(list);
				}
			});
		});
	},

	getById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Task.findById(id, function(err, task){
				if (err){
					reject(err);
					return;
				}

				if (isRaw == true) {
					resolve(task);
				} else {
					resolve(task.summary());
				}
			});
		});
	},

	post: function(params, isRaw){
		return new Promise(function(resolve, reject){
			Task.create(params, function(err, task){
				if (err){
					reject(err);
					return;
				}
				
				if (isRaw == true) {
					resolve(task);
				}

				else {
					resolve(task.summary());
				}
			});
		});
	}
}
