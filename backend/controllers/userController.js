import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import wrap from "../utils.js";

const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "5d",
	});
};

/**
 * @desc register User
 * @route POST /api/users/register
 * @access public
 */
export const registerUser = wrap(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please send all the required details.");
	}
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User Already exists");
	}
	// hash password
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);
	const user = await User.create({ name, email, password: hashedPassword });
	if (user) {
		return res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	}
	res.status(400);
	throw new Error("Invalid user data");
});

/**
 * @desc login Users
 * @route POST /api/users/login
 * @access public
 */
export const loginUser = wrap(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await bcrypt.compare(password, user.password)))
		return res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	res.status(401);
	throw new Error("Invalid user credentials");
});

/**
 * @desc get Logged in user details
 * @route GET /api/users/me
 * @access protected
 */
export const getUserDetails = wrap(async (req, res) => {
	const user = {
		id: req.user._id,
		name: req.user.name,
		email: req.user.email,
	};
	return res.status(200).send(user);
});
