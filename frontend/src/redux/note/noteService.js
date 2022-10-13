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

const noteService = { getNotes };

export default noteService;
