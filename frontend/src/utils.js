export const composeErrorMessage = error =>
	error.response?.data?.message ??
	error.message ??
	error.toString() ??
	"Internal Server Error";
