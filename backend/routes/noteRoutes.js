import { Router } from "express";
import { createNote, getNotes } from "../controllers/noteController.js";

// Since NotesRoute is a child of Tickets route, we provide mergeParams:true, which allows us to use Parent's req.params as well else it will be undefined
// In our case Notes route is /api/tickets/:ticketId/notes/* , with mergeParams:true, we can retrieve ticketId inside notes route as well
const router = Router({ mergeParams: true });

// /api/tickets/:ticketId/notes
router.route("/").get(getNotes).post(createNote);

export default router;
