import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/error.js";

config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.status(200).send({ msg: "Welcome to Support Desk API" });
});

// User Routes
app.use("/api/users", userRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
