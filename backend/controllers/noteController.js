import Note from "../models/noteModel.js";
import wrap from "../utils.js";

/**
 * @desc Get all Notes in a particular ticket of current user
 * @route GET /api/tickets/:ticketId/notes
 * @access Private
 */
export const getNotes = wrap(async (req, res) => {
	const notes = await Note.find({ ticket: req.params.ticketId });
	return res.status(200).send(notes);
});

/**
 * @desc Create Note of a particular ticket
 * @route POST /api/tickets/:ticketId/notes
 * @access Private
 */
export const createNote = wrap(async (req, res) => {
	const note = await Note.create({
		text: req.body.text,
		isStaff: false,
		ticket: req.params.ticketId,
		user: req.user._id,
	});
	return res.status(201).send(note);
});
