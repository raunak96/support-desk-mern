import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/userRoutes.js";

config();
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
	res.status(200).send({ msg: "Welcome to Support Desk API" });
});
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
