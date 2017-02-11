var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var utils = require('../utils');


router.get('/task', function(req, res, next) {
    res.json({
        confirmation: 'success',
        message: 'it worked!'
    });
});

router.get('/notify', function(req, res, next) {
    utils.TwilioManager
        .sendSMS('9175800371', 'Does this thing work?')
        .then(function(message) {
            res.json({
                confirmation: 'success',
                message: message
            });

            return message;
        })
        .catch(function(err) {
            res.json({
                confirmation: 'fail',
                message: err
            });
        });
});

router.post('/notify', function(req, res, next) {
    var username = req.body.username || 'Somebody';

    if (req.body.recipient == null) {
        res.json({
            confirmation: 'fail',
            message: 'Please specify a recipient.'
        });

        return;
    }

    if (req.body.text == null) {
        res.json({
            confirmation: 'fail',
            message: 'Please include a message.'
        });

        return;
    }

    // get profile first
    controllers.profile
        .getById(req.body.recipient, false) 
        .then(function(profile) {
            var msg = 
                username 
                + ' replied to your task, here is the message:\n\n' 
                + req.body.text 
                + '\n\n'
                + 'View ' 
                + username 
                + '\'s profile here: https://tasks-manager-bs.herokuapp.com/';

            return utils.TwilioManager.sendSMS(profile.phone, msg);
        })
        .then(function(message) {
            res.json({
                confirmation: 'success',
                message: message
            });

            return message;
        })
        .catch(function(err) {
            res.json({
                confirmation: 'fail',
                message: err
            });
        });
});

router.post('/task', function(req, res, next) {
    var message = req.body['Body'];

    // Title. Category. Task description.
    // Tell on the website: this is the format.

    var validCategories = ['delivery', 'house cleaning', 'dog walking', 'misc'];

    var parts = message.split('.');

    var category = (parts.length == 1) ? 'misc' : parts[1].trim().toLowerCase();
    var description = null;

    // check if category word is valid
    if (validCategories.indexOf(category) == -1) {
        category = 'misc';
        var theRest = parts.splice(1);
        description = theRest.trim();

    } else {
        var description = (parts.length < 3) ? '' : parts[2].trim();
    }

    var task = {
        title: parts[0],
        category: category,
        description: description
    }

    var senderNumber = req.body['From'].replace('+1', ''); 

    controllers.profile
        .get({ phone: senderNumber }, false)
        .then(function(profiles) {
            if (profiles.length == 0) {
                throw new Error('Phone number not found');
                return;
            }

            var profile = profiles[0];

            task['profile'] = {
                id: profile.id,
                username: profile.username
            }

            return controllers.task.post(task, false);
        })
        .then(function(task) {
        	var msg = 'Task confirmed! You will get a text update if somebody responds to your text!';

            utils.TwilioManager.sendSMS(senderNumber, msg);
        })
        .catch(function(err) {
            console.error(err.message);
        });

});

module.exports = router;
