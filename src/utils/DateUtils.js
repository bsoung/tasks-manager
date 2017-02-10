import Time from 'react-time'; // https://github.com/andreypopp/react-time
import React from 'react';

export default {
	formattedDate: (date) => {
		// if Date is within 24 hours, return 'relative' Time component instead:
		const now = new Date().getTime();


		const difference = now - new Date(date).getTime(); 

		const seconds = difference / 1000;
		const minutes = seconds / 60;
		const hours = minutes / 60;

		console.log(hours)

		if (hours < 24) {
			return <Time value={date} format="MMM DD, YYYY" relative />

		} else {
			return <Time value={ date } format="MMM DD, YYYY" />
		}	
	}
}