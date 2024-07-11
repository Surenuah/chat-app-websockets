export const asyncErrorHandler = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(error => {
		console.error('Error:', error.message);
		res.status(500).json({ error: 'Server error, please try again later' });
	});
};
