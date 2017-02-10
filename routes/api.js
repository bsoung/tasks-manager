var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/:resource', function(req, res, next) {
	var resource = req.params.resource;

	var controller = controllers[resource];
	if (controller == null) {
		res.json({
  			confirmation: 'fail',
  			resource: 'invalid resource'
  		});

  		return;
	}

	controller.get(req.query, false)
		.then(function(results) {
			res.json({
				confirmation: 'success',
				results: results
			});
		})
		.catch(function(err) {
			res.json({
				confirmation: 'fail',
				message: err
			});
		});
		
});

router.get('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource;

	var controller = controllers[resource];

	if (controller == null) {
		res.json({
  			confirmation: 'fail',
  			resource: 'invalid resource'
  		});

  		return;
	}

	controller.getById(req.params.id, false)
		.then(function(result) {
			res.json({
				confirmation: 'success',
				results: result
			});
		})
		.catch(function(err) {
			res.json({
				confirmation: 'fail',
				message: 'not found'
			});
		});

});

router.post('/:resource', function(req, res, next) {
	var resource = req.params.resource;

	var controller = controllers[resource];

	if (controller == null) {
		res.json({
  			confirmation: 'fail',
  			resource: 'invalid resource'
  		});

  		return;
	}

	controller.post(req.body, false)
		.then(function(result) {
			res.json({
				confirmation: 'success',
				results: result
			});
		})
		.catch(function(err) {
			res.json({
				confirmation: 'fail',
				message: err
			});
		});

});

module.exports = router;
