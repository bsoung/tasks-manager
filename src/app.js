import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Home, Split } from './components/layout';
import { Provider } from 'react-redux';
import store from './stores';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const app = (
	<Provider store={ store.configureStore() }>
		<Router history={browserHistory}>
			<Route path="/" component={Home} />
			<Route path="/task/:id" component={Split} />
		</Router>
	</Provider>
)


ReactDOM.render(app, document.getElementById('root'));