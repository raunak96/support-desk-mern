import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Ticket from "../models/ticketModel.js";
import User from "../models/userModel.js";
import wrap from "../utils.js";

export const isAuthenticated = wrap(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers?.authorization?.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
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

export const ticketAuthorization = wrap(async (req, res, next) => {
	const ticketId = req.params.id;
	if (!mongoose.isValidObjectId(ticketId)) {
		res.status(422);
		throw new Error("This resource does not exist");
	}
	const ticket = await Ticket.findById(ticketId);
	if (!ticket) {
		res.status(404);
		throw new Error("Ticket not found");
	}
	if (ticket.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error("Not authorized");
	}
	req.ticket = ticket;
	next();
});
