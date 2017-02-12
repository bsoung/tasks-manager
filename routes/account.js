var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.get('/:action', function(req, res, next) {
	var action = req.params.action;
	if (action == 'currentuser') {
		// check the current user
		if (req.session == null) {
			res.json({
				confirmation: 'success',
				user: null
			});

			return;
		}

		if (req.session.token == null) {
			res.json({
				confirmation: 'success',
				user: null
			});

			return;
		}

		// verify token:
		jwt.verify(req.session.token, process.env.TOKEN_SECRET, function(err, decoded) {
			if (err) {
				
				if (process.env.NODE_ENV == 'production') {
					req.session.token.reset();
				}
				
				res.json({
					confirmation: 'fail',
					user: null
				});
				
				return;
			}

			controllers.profile
				.getById(decoded.id, false)
				.then(function(result) {
					res.json({
						confirmation: 'success',
						user: result
					});

					return;
				})
				.catch(function(error) {
					res.json({
						confirmation: 'fail',
						message: error
					});

					return;
				});
		});
	}

	if (action == 'logout') {
		// logout
		req.session.reset();

		res.json({
			confirmation: 'success',
			user: null
		});
	}
});

router.post('/:action', function(req, res, next) {
	var action = req.params.action;

	if (action == 'register') {

		// register
		controllers.profile
			.post(req.body, false)
			.then(function(result) {


				var token = jwt.sign({id: result.id}, process.env.TOKEN_SECRET, {expiresIn: 4000});
				req.session.token = token;

				res.json({
					confirmation: 'success',
					user: result,
					token: token
				});
			})

			.catch(function(err) {
				console.log("still error?")
				res.json({
					confirmation: 'fail',
					message: err
				});
			});
	}

	if (action == 'login') {
		controllers.profile
			.get({email: req.body.email}, true)
			.then(function(results) {
				if (results.length == 0) {
					throw new Error('User not found.');
					return;
				}

				var profile = results[0];

				// check password
				var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password);
				if (isPasswordCorrect == false) {
					throw new Error('Wrong password.');
					return;
				}

				var token = jwt.sign({id: profile._id}, process.env.TOKEN_SECRET, {expiresIn: 4000});
				req.session.token = token;

				res.json({
					confirmation: 'success',
					user: profile.summary()
				});

				return;

			})
			.catch(function(err) {
				res.json({
					confirmation: 'fail',
					message: err.message
				});
			})

	}

});

module.exports = router;