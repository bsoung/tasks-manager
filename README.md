# Tasks Manager

This is a personal message board for friends, family, and roommates to help organize repeatable tasks and manage different requests. It puts a fun spin on a traditional group chat or whiteboard calendar, and integrates nicely with the mobile life!

[Try it here!](https://tasks-manager-bs.herokuapp.com)

Sometimes Heroku has a hiccup and it may affect this app. Check the their status if something is wrong by going here: https://status.heroku.com/


## Motivation

* Users post tasks to the message board via text messaging and a particular message format. 
* Other users can see the tasks, and can reply to them from the website.
* The original task poster will be notified of responses via text. These interactions are facilitated by the use of Twilio. 

## Technologies

* React
* Redux
* MongoDB
* Express
* Twilio
* JSONWebToken
* Superagent
* Gulp
* Webpack / Babel

## Wireframe

![breakr](http://i.imgur.com/srUi9GW.png "Breakr interface")
![breakr](http://i.imgur.com/nE9M3Si.png "Breakr interface")

## API Reference

* GET /account/currentuser    :: returns the current authenticated user
* GET /account/logout    :: logs the current user out
* POST /account/register    :: returns the newly registered user
* POST /account/login    :: returns the authenticated user
* GET /api/profile   :: returns a list of all the profiles
* POST /api/task   :: returns a newly created task
* GET /api/message  :: returns a list of all the messages
* POST /twilio/notify   :: returns a newly created message notification to be sent via text by twilio
* POST /twilio/task   :: returns a newly created task from a text message sent by twilio


## Develop

* Clone the repo.
* Run npm install, and then run webpack.
* Make sure Gulp is installed, then run gulp.
* Start nodemon, and switch over to localhost:3000.

### Contributers
* bsoung


