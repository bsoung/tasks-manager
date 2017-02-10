import superagent from 'superagent';

export default {
	get: (url, params) => {
		return new Promise((resolve, reject) => {
			superagent
				.get(url)
				.query(params)
				.set('Accept', 'application/json')
				.end((err, response) => {
					if (err) {
						reject(err);
						return;
					}

					if (response.body.confirmation != 'success') {
						reject(new Error(response.body.message));
						return;
					}

					resolve(response.body);
				});
		});
	},

	post: (url, params) => {
		return new Promise((resolve, reject) => {
			superagent
				.post(url)
				.send(params)
				.set('Accept', 'application/json')
				.end((err, response) => {
					if (err) {
						reject(err);
						return;
					}
					
					if (response.body.confirmation != 'success') {
						reject(new Error(response.body.message));
						return;
					}

					resolve(response.body);
				});

		});
	}
}



















