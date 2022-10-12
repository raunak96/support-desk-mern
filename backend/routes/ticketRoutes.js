import { Router } from "express";
import {
	createTicket,
	deleteTicket,
	getTicketById,
	getTickets,
	updateTicket,
} from "../controllers/ticketController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

router
	.route("/")

	/* Get Tickets for current User */
	.get(isAuthenticated, getTickets)

	/* Create a new Ticket */
	.post(isAuthenticated, createTicket);

router
	.route("/:id")

	/* Get particular Ticket */
	.get(isAuthenticated, getTicketById)

	/* Delete a particular Ticket */
	.delete(isAuthenticated, deleteTicket)

	/* Update a particular Ticket */
	.put(isAuthenticated, updateTicket);

export default router;
