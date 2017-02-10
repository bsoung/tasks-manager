import React, { Component } from 'react';
import { Task, Account } from '../containers';

export default (props) => {
	return (

			<div id="wrapper">
					<div id="main">
						<div className="inner">
								<header id="header">
									<a href="index.html" className="logo">Tasks Manager</a>
									<ul className="icons">
										<li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
										<li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
										<li><a href="#" className="icon fa-snapchat-ghost"><span className="label">Snapchat</span></a></li>
										<li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
										<li><a href="#" className="icon fa-medium"><span className="label">Medium</span></a></li>
									</ul>
								</header>
								<Task {...props} />
								
						</div>
					</div>
					
					{/* try to fix sidebar div id="sidebar" */}
					<div>
						<Account />
					</div>

			</div>

	);
}