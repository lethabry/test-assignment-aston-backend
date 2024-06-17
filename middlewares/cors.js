const allowedCors = [
	'localhost:3000',
	'http://localhost:3000',
	'https://localhost:3000',
	'localhost:5173',
	'http://localhost:5173',
	'https://localhost:5173',
	'http://127.0.0.1:5173'
];

function checkAccessCors(req, res, next) {
	const { origin } = req.headers;
	if (allowedCors.includes(origin)) {
		res.header('Access-Control-Allow-Origin', origin);
		res.header('Access-Control-Allow-Credentials', true);
	}
	const { method } = req;
	const requestHeaders = req.headers['access-control-request-headers'];
	const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
	if (method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
		res.header('Access-Control-Allow-Headers', requestHeaders);
		return res.end();
	}
	return next();
}

module.exports = checkAccessCors;
