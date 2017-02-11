import React, { Component } from 'react';
import { Profile } from '../containers';

export default (props) => {
		return (
			<div>
				This is the profile layout
				<Profile {...props} />	
			</div>

		);
}
