import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "../redux/ticket/ticketSlice";
import authReducer from "../redux/auth/authSlice";
import noteReducer from "../redux/note/noteSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		ticket: ticketReducer,
		note: noteReducer,
	},
});
