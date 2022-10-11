import { model, Schema } from "mongoose";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a name"],
		},
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);

export default User;
