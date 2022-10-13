import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

const Home = () => {
	return (
		<>
			<section className="heading">
				<h1>What do you need help with?</h1>
				<p>Please choose from an option below.</p>
			</section>
			<Link to="tickets/new" className="btn btn-reverse btn-block">
				<FaQuestionCircle /> Create a new ticket
			</Link>
			<Link to="/tickets" className="btn btn-block">
				<FaTicketAlt /> View Your Tickets
			</Link>
		</>
	);
};
export default Home;
