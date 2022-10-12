import mongoose from "mongoose";
import Ticket from "../models/ticketModel.js";
import wrap from "../utils.js";

/**
 * @desc Get all Tickets of current user
 * @route GET /api/tickets
 * @access Private
 */
export const getTickets = wrap(async (req, res) => {
	const tickets = await Ticket.find({ user: req.user._id });
	return res.status(200).send(tickets);
});

/**
 * @desc Get a particular ticket of current user
 * @route GET /api/tickets/:id
 * @access Private
 */
export const getTicketById = wrap(async (req, res) => {
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
	return res.status(200).send(ticket);
});

/**
 * @desc Create a new Ticket
 * @route POST /api/tickets
 * @access Private
 */
export const createTicket = wrap(async (req, res) => {
	const { product, description } = req.body;
	if (!product || !description) {
		res.status(400);
		throw new Error("Please provide relevant details about the issue.");
	}

	const ticket = new Ticket({
		product,
		description,
		user: req.user._id,
	});
	const createdTicket = await ticket.save();
	return res.status(201).send(createdTicket);
});

/**
 * @desc Delete a particular ticket of current user
 * @route DELETE /api/tickets/:id
 * @access Private
 */
export const deleteTicket = wrap(async (req, res) => {
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
	await ticket.deleteOne();
	return res.status(200).send({ success: true });
});

/**
 * @desc Update a particular ticket of current user
 * @route PUT /api/tickets/:id
 * @access Private
 */
export const updateTicket = wrap(async (req, res) => {
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
	/* {new:true} returns updatedDoc instead of original which is default  */
	const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, {
		new: true,
	});
	return res.status(200).send(updatedTicket);
});
