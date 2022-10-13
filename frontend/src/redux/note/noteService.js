import axios from "axios";

const API_URL = "/api/tickets";

const getNotes = async (token, ticketId) => {
	const { data } = await axios.get(`${API_URL}/${ticketId}/notes`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
};
const createNote = async ({ token, ticketId, noteData }) => {
	const { data } = await axios.post(
		`${API_URL}/${ticketId}/notes`,
		noteData,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return data;
};

const noteService = { getNotes, createNote };

export default noteService;
