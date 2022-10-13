import axios from "axios";

const API_URL = "/api/tickets";

const createTicket = async (ticketData, token) => {
	const { data } = await axios.post(API_URL, ticketData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
};

const getTickets = async token => {
	const { data } = await axios.get(API_URL, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
};

const getTicket = async (id, token) => {
	const { data } = await axios.get(`${API_URL}/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return data;
};

const closeTicket = async (id, token) => {
	const { data } = await axios.put(
		`${API_URL}/${id}`,
		{ status: "closed" },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return data;
};

const ticketService = { createTicket, getTickets, getTicket, closeTicket };
export default ticketService;
