import mongoose from "mongoose";

const errorHandler = (err, req, res, next) => {
	if (mongoose.connection.readyState === 0) {
		return res.status(500).send({
			message: "Connection to DB was lost. Try Again later",
			stack:
				process.env.NODE_ENV === "production"
					? null
					: "Connection to DB was lost. Try Again later",
		});
	}
	const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
	res.status(statusCode).send({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export default errorHandler;
