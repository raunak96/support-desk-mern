import { Router } from "express";
import {
	createTicket,
	deleteTicket,
	getTicketById,
	getTickets,
	updateTicket,
} from "../controllers/ticketController.js";
import { ticketAuthorization } from "../middlewares/auth.js";
import noteRouter from "./noteRoutes.js";

const router = Router();

// /api/tickets
router.route("/").get(getTickets).post(createTicket);

/* Operations on ticket of given id */
// /api/tickets/:ticketId
router
	.route("/:ticketId")
	.get(ticketAuthorization, getTicketById)
	.delete(ticketAuthorization, deleteTicket)
	.put(ticketAuthorization, updateTicket);

/* Operations for Notes in a ticket-> when this endpoint hits re-route to notes route  */
// /api/tickets/:ticketId/notes/*
router.use("/:ticketId/notes", ticketAuthorization, noteRouter);

export default router;
