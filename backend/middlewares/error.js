const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
	res.status(statusCode).send({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export default errorHandler;
