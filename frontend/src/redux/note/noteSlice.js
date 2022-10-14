import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { failed, idle, loading, success } from "../../constants/status";
import { composeErrorMessage } from "../../utils";
import { logout } from "../auth/authSlice";
import noteService from "./noteService";

const initialState = {
	notes: null,
	status: idle,
};

export const getNotes = createAsyncThunk(
	"note/getAll",
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await noteService.getNotes(token, ticketId);
		} catch (error) {
			const message = composeErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);
export const createNote = createAsyncThunk(
	"note/new",
	async ({ ticketId, noteData }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await noteService.createNote({ token, ticketId, noteData });
		} catch (error) {
			const message = composeErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const noteSlice = createSlice({
	name: "note",
	initialState,
	extraReducers: builder => {
		builder
			.addCase(getNotes.pending, (state, action) => {
				state.status = loading;
			})
			.addCase(getNotes.fulfilled, (state, action) => {
				state.notes = action.payload;
				state.status = success;
			})
			.addCase(getNotes.rejected, state => {
				state.notes = null;
				state.status = failed;
			})
			.addCase(createNote.fulfilled, (state, action) => {
				if (state.notes) state.notes.push(action.payload);
			})
			// Here coz of extraReducers, we are able to change state of noteSlice, when logout action in
			// authSlice is run
			.addCase(logout, state => {
				state.notes = null;
				state.status = "idle";
			});
	},
});

const noteReducer = noteSlice.reducer;
export default noteReducer;
