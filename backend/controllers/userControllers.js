// this function wraps around async function and allows us to use async await otherwise we need to use then.catch

let wrap =
	fn =>
	(...args) =>
		fn(...args).catch(args[2]);

/**
 * @desc register User
 * @route "/api/user/register"
 * @access public
 */
export const registerUser = wrap(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please send all the required details.");
	}
	res.status(201).send({ msg: "Register user" });
});

/**
 * @desc login Users
 * @route "/api/user/login"
 * @access public
 */
export const loginUser = wrap(async (req, res) => {
	res.status(201).send({ msg: "Login User" });
});
