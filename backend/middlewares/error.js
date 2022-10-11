const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode ?? 500;
	res.status(statusCode).send({
		msg: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export default errorHandler;
