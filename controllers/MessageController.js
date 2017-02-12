var Message = require('../models/Message');

module.exports = {
	get: function(params, isRaw){
		return new Promise(function(resolve, reject){
			var filters = {
				sort: {timestamp: -1}
			}

			Message.find(params, null, filters, function(err, messages){
				if (err){
					reject(err);
					return;
				}

				if (isRaw) {
					resolve(messages);

				} else {
					var list = [];

					messages.forEach(function(message){
						list.push(message.summary());
					})

					resolve(list);
				}
			});
		});
	},

	getById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Message.findById(id, function(err, message){
				if (err){
					reject(err);
					return;
				}

				if (message == null) {
					reject(new Error(err));
					return;
				}

				if (isRaw) {
					resolve(message);

				} else {
					resolve(message.summary());
				}
			});
		});
	},

	post: function(params, isRaw){
		return new Promise(function(resolve, reject){
			Message.create(params, function(err, message){
				if (err){
					reject(err);
					return;
				}
				
				if (isRaw) {
					resolve(message);
					
				} else {
					resolve(message.summary());
				}
			});
		});
	}
}
