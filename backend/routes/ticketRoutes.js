import { Router } from "express";
import {
	createTicket,
	deleteTicket,
	getTicketById,
	getTickets,
	updateTicket,
} from "../controllers/ticketController.js";
import { isAuthenticated, ticketAuthorization } from "../middlewares/auth.js";

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
	.get(isAuthenticated, ticketAuthorization, getTicketById)

	/* Delete a particular Ticket */
	.delete(isAuthenticated, ticketAuthorization, deleteTicket)

	/* Update a particular Ticket */
	.put(isAuthenticated, ticketAuthorization, updateTicket);

export default router;
