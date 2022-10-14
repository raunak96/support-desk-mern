import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";
import errorHandler from "./middlewares/error.js";
import connectToDB from "./config/db.js";
import colors from "colors";
import { isAuthenticated } from "./middlewares/auth.js";
import path from "path";
import { fileURLToPath } from "url";

config();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User Routes
app.use("/api/users", userRouter);

// Ticket Routes
app.use("/api/tickets", isAuthenticated, ticketRouter);

// Serve frontend for production environment
if (process.env.NODE_ENV === "production") {
	// Set build folder as static
	app.use(express.static(path.join(__dirname, "../frontend/build")));

	/* When non-api routes are hit serve them from React App */
	app.get("*", (_, res) => {
		res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
	});
} else {
	app.get("/", (_, res) => {
		res.status(200).json({ message: "Welcome to the Support Desk API" });
	});
}
// Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at ${PORT}`.rainbow.bold));
