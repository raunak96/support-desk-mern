import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { failed, idle, loading, success } from "../../constants/status";
import { composeErrorMessage } from "../../utils";
import ticketService from "./ticketService";

const initialState = {
	tickets: null,
	ticket: null,
	status: idle,
};

export const generateTicket = createAsyncThunk(
	"ticket/new",
	async (ticket, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.createTicket(ticket, token);
		} catch (error) {
			const message = composeErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getTickets = createAsyncThunk(
	"ticket/getAll",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.getTickets(token);
		} catch (error) {
			const message = composeErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getTicket = createAsyncThunk(
	"ticket/getOne",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.getTicket(id, token);
		} catch (error) {
			const message = composeErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const closeTicket = createAsyncThunk(
	"ticket/close",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.closeTicket(id, token);
		} catch (error) {
			const message = composeErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	extraReducers: builder => {
		builder
			.addCase(getTickets.pending, (state, action) => {
				state.status = loading;
			})
			.addCase(getTickets.fulfilled, (state, action) => {
				state.tickets = action.payload;
				state.status = success;
			})
			.addCase(getTickets.rejected, state => {
				state.tickets = null;
				state.status = failed;
			})
			.addCase(getTicket.pending, (state, action) => {
				state.ticket = null;
			})
			.addCase(getTicket.fulfilled, (state, action) => {
				state.ticket = action.payload;
			})
			.addCase(getTicket.rejected, state => {
				state.ticket = null;
			})
			.addCase(closeTicket.fulfilled, (state, action) => {
				state.ticket = action.payload;
				if (state.tickets)
					state.tickets = state.tickets.map(ticket =>
						ticket._id === action.payload._id
							? action.payload
							: ticket
					);
			});
	},
});
const ticketReducer = ticketSlice.reducer;
export default ticketReducer;
