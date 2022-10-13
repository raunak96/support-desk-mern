import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { composeErrorMessage } from "../../utils";
import noteService from "./noteService";

const initialState = {
	notes: null,
	isLoading: false,
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

export const noteSlice = createSlice({
	name: "note",
	initialState,
	extraReducers: builder => {
		builder
			.addCase(getNotes.pending, (state, action) => {
				state.notes = [];
				state.isLoading = true;
			})
			.addCase(getNotes.fulfilled, (state, action) => {
				state.notes = action.payload;
				state.isLoading = false;
			})
			.addCase(getNotes.rejected, state => {
				state.notes = null;
				state.isLoading = false;
			});
	},
});

const noteReducer = noteSlice.reducer;
export default noteReducer;
