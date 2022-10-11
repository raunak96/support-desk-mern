export const registerUser = (req, res) => {
	res.status(201).send({ msg: "Register user" });
};

export const loginUser = (req, res) => {
	res.status(201).send({ msg: "Login User" });
};
