const checkIsNumbers = (string) => {
	const onlyNumsString = string.replace(/[^0-9]+/g, '');
	return string.length === onlyNumsString.length;
};

module.exports = checkIsNumbers;
