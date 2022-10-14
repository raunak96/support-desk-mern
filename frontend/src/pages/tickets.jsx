import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import { failed, idle, loading } from "../constants/status";
import { getTickets } from "../redux/ticket/ticketSlice";

const Tickets = () => {
	const { tickets, status } = useSelector(state => state.ticket);
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === idle)
			dispatch(getTickets())
				.unwrap()
				.catch(error => {
					toast.error(`${error}`);
				});
	}, [dispatch, status]);
	return status === loading ? (
		<Spinner />
	) : (
		<>
			<BackButton />
			<div className="tickets">
				<div className="ticket-headings">
					<div>Date</div>
					<div>Product</div>
					<div>Status</div>
					<div></div>
				</div>
				{tickets
					? tickets.map(ticket => (
							<TicketItem key={ticket._id} ticket={ticket} />
					  ))
					: status === failed && (
							<h3>
								Could not get your tickets. Please try reloading
								the page.
							</h3>
					  )}
			</div>
		</>
	);
};
export default Tickets;
