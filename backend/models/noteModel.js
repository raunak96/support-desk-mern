import { model, Schema } from "mongoose";

const noteSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		ticket: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Ticket",
		},
		text: {
			type: String,
			required: [true, "Please add some text"],
		},
		isStaff: {
			type: Boolean,
			default: false,
		},
		staffId: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Note = model("Note", noteSchema);

export default Note;
