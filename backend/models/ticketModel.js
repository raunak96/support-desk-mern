import { model, Schema } from "mongoose";

const ticketSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		product: {
			type: String,
			required: [true, "Please select a product"],
			enum: ["iPhone", "Macbook Pro", "iMac", "iPad"],
		},
		description: {
			type: String,
			required: [true, "Please enter a description of the issue"],
		},
		status: {
			type: String,
			required: true,
			enum: ["new", "open", "closed"],
			default: "new",
		},
	},
	{
		timestamps: true,
	}
);

/*  This makes sure that validator is run before findOneAndUpdate updates the field for example in our case,the status can only be ["new", "open", "closed"] as
    stated in Schema, hence we run the below hook. By default findOneAndUpdate does not run validator unlike save() method*/
ticketSchema.pre("findOneAndUpdate", function (next) {
	this.options.runValidators = true;
	next();
});

const Ticket = model("Ticket", ticketSchema);

export default Ticket;
