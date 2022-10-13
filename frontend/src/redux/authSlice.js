import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { composeErrorMessage } from "../utils";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
	user: user ?? null,
	isLoading: false,
};

/**
 * createAsyncThunk is used to perform async logic and connects it to extraReducers where its diff states like pending,
 * fulfilled can be retrieved
 * @param 1st param is just a name of action can be anything
 * @param async function
 * the user param is user data that will come from our form
 */
export const registerUser = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (error) {
			const message = composeErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"auth/login",
	async (user, thunkAPI) => {
		try {
			return await authService.login(user);
		} catch (error) {
			const message = composeErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,

	/* It includes normal actions that cause state changes */
	reducers: {
		logout: state => {
			authService.logout();
			state.user = null;
		},
	},

	/**
	 * @desc The `extraReducers` field lets the slice handle actions defined elsewhere,
	 * including actions generated by createAsyncThunk i.e async actions like in our queries from db or in other slices.
	 * @param builder - provides different cases for our async fn like state pending or data fetch successful
	 */
	extraReducers: builder => {
		builder
			.addCase(registerUser.pending, state => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(registerUser.rejected, state => {
				state.isLoading = false;
			})
			.addCase(loginUser.pending, state => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, state => {
				state.isLoading = false;
			});
		/* .addCase(logout, state => {
				state.user = null;
			}); */
	},
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
