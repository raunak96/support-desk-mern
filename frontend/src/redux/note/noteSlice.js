import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { failed, idle, loading, success } from "../../constants/status";
import { composeErrorMessage } from "../../utils";
import noteService from "./noteService";

const initialState = {
	notes: null,
	isLoading: false,
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
				if (!state.notes) state.notes = [action.payload];
				else state.notes.push(action.payload);
			});
	},
});

const noteReducer = noteSlice.reducer;
export default noteReducer;
