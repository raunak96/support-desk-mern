import mongoose from "mongoose";

const connectToDB = async () => {
	try {
		const conn = await mongoose.connect(
			process.env.MONGO_URI || "mongodb://localhost:27017/supportdesk"
		);
		console.log(
			`MongoDB Connected: ${conn.connection.host}`.cyan.underline
		);
	} catch (error) {
		console.log("DB error", error.message);
		process.exit(1); //for app to shut down
	}
};

export default connectToDB;
