var Profile = require('../models/Profile');
var bcrypt = require('bcryptjs');

module.exports = {
	get: function(params, isRaw) {
		return new Promise(function(resolve, reject) {
			Profile.find(params, function(err, profiles) {
				if (err) {
					reject(err);
					return;
				}
				if (isRaw == true) {
					resolve(profiles);
					
				} else {
					var list = [];
					profiles.forEach(function(profile) {
						list.push(profile.summary());
					});

					resolve(list);
				}
			});
		});
	},

	getById: function(id, isRaw) {
		return new Promise(function(resolve, reject) {
			Profile.findById(id, function(err, profile) {
				if (err) {
					reject(err);
					return;
				}

				if (profile == null) {
					reject(new Error(err));
					return;
				}

				if (isRaw == true) {
					resolve(profiles);
				} else {
					resolve(profile.summary());
				}
			});
		});
	},

	post: function(params, isRaw) {
		return new Promise(function(resolve, reject) {
			if (params['password']) {
				params['password'] = bcrypt.hashSync(params.password, 10);
			}


			Profile.create(params, function(err, profile) {
				if (err) {
					reject(err);
					return;
				}


				if (isRaw == true) {
					resolve(profile);
				} else {
					resolve(profile.summary());
				}
			});
		});
	}
}