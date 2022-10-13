import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TicketItem = ({ ticket }) => {
	return (
		<div className="ticket">
			<div>{new Date(ticket.createdAt).toLocaleString("in")}</div>
			<div>{ticket.product}</div>
			<div className={`status status-${ticket.status}`}>
				{ticket.status}
			</div>
			<Link
				to={`/tickets/${ticket._id}`}
				className="btn btn-reverse btn-sm">
				View
			</Link>
		</div>
	);
};

TicketItem.propTypes = {
	ticket: PropTypes.object.isRequired,
};

export default TicketItem;
