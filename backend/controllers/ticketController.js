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

/* Below operations passes through ticketAuthorization middleware before coming here which if successful stores ticket in req.ticket */

/**
 * @desc Get a particular ticket of current user
 * @route GET /api/tickets/:id
 * @access Private
 */
export const getTicketById = (req, res) => {
	return res.status(200).send(req.ticket);
};

/**
 * @desc Delete a particular ticket of current user
 * @route DELETE /api/tickets/:id
 * @access Private
 */
export const deleteTicket = wrap(async (req, res) => {
	const ticket = req.ticket;
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
	/* {new:true} returns updatedDoc instead of original which is default  */
	const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, {
		new: true,
	});
	return res.status(200).send(updatedTicket);
});
