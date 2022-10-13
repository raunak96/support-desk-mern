import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { closeTicket, getTicket } from "../redux/ticket/ticketSlice";
import NotesList from "../components/NotesList";

const Ticket = () => {
	const { ticket } = useSelector(state => state.ticket);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const { ticketId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getTicket(ticketId))
			.unwrap()
			.then(() => {
				setIsLoading(false);
			})
			.catch(error => {
				toast.error(error);
				navigate("/");
			});
	}, [dispatch, ticketId, navigate]);

	const handleTicketClose = async () => {
		dispatch(closeTicket(ticketId))
			.unwrap()
			.then(() => {
				toast.success("Ticket Closed");
				navigate("/tickets");
			})
			.catch(toast.error);
	};

	return isLoading ? (
		<Spinner />
	) : ticket ? (
		<div className="ticket-page">
			<header className="ticket-header">
				<BackButton />
				<h2>
					Ticket ID: {ticket._id}
					<span className={`status status-${ticket.status}`}>
						{ticket.status}
					</span>
				</h2>
				<div className="ticket-info">
					<h3>
						Date Submitted:{" "}
						{new Date(ticket.createdAt).toLocaleString("en-US")}
					</h3>
					<h3>Product: {ticket.product}</h3>
				</div>
				<hr />
				<div className="ticket-desc">
					<h3>Description of Issue</h3>
					<p>{ticket.description}</p>
				</div>
				<hr />
				<h2>Notes</h2>
			</header>
			<NotesList ticketId={ticketId} />
			{ticket.status !== "closed" && (
				<button
					onClick={handleTicketClose}
					className="btn btn-block btn-danger">
					Close Ticket
				</button>
			)}
		</div>
	) : (
		<h3>
			Could Not get Your Ticket Details. Please try again.The
			inconvenience is regretted.
		</h3>
	);
};
export default Ticket;
