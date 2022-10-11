import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const wrap =
	fn =>
	(...args) =>
		fn(...args).catch(args[2]);

export const isAuthenticated = wrap(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers?.authorization?.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decoded);
			/* Store user details obtained from db (except password) to req.user */
			const user = await User.findById(decoded.id).select("-password");
			if (!user) {
				res.status(401);
				throw new Error("User is not Authenticated");
			}
			req.user = user;
			next();
		} catch (error) {
			res.status(401);
			throw new Error("User is not Authenticated");
		}
	}
	if (!token) {
		res.status(401);
		throw new Error("User is not Authenticated");
	}
});
