import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";
import errorHandler from "./middlewares/error.js";
import connectToDB from "./config/db.js";
import colors from "colors";
import { isAuthenticated } from "./middlewares/auth.js";

config();
const PORT = process.env.PORT || 5000;

connectToDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.status(200).send({ message: "Welcome to Support Desk API" });
});

// User Routes
app.use("/api/users", userRouter);

// Ticket Routes
app.use("/api/tickets", isAuthenticated, ticketRouter);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at ${PORT}`.rainbow.bold));
