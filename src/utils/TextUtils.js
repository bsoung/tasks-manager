export default {
	capitalize: (string) => {
		if (string == null) {
			return '';
		}

		if (string.length == 0) {
			return string;
		}

		if (string.length == 1) {
			return string.toUpperCase();
		}

		const firstLetter = string.substring(0, 1);
		const capitalized = firstLetter.toUpperCase() + string.substring(1);

		return capitalized;
	}
}