import Time from 'react-time'; // https://github.com/andreypopp/react-time
import React from 'react';

export default {
	formattedDate: (date) => {
		// if Date is within 24 hours, return 'relative' Time component instead:
			
		//
		return <Time value={ date } format="MMM DD, YYYY" />
	}
}