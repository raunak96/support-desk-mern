import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import { getTickets } from "../redux/ticket/ticketSlice";

const Tickets = () => {
	const { tickets } = useSelector(state => state.ticket);
	const [isLoading, setIsLoading] = useState(tickets ? false : true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTickets())
			.unwrap()
			.then(() => {
				setIsLoading(false);
			})
			.catch(error => {
				toast.error(`${error}`);
				setIsLoading(false);
			});
	}, [dispatch]);
	return isLoading ? (
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
				{tickets &&
					tickets.map(ticket => (
						<TicketItem key={ticket._id} ticket={ticket} />
					))}
			</div>
		</>
	);
};
export default Tickets;
