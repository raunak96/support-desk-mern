import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/home";
import Login from "./pages/login";
import NewTicket from "./pages/NewTicket";
import Register from "./pages/register";
import Ticket from "./pages/ticket";
import Tickets from "./pages/tickets";

const App = () => {
	return (
		<>
			<Router>
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						{/* All ticket Routes are protected, We can do this in 2 ways,
                    
                        Way 1 -> Old version way where component to render on condition passing in passed as children to PrivateRoute Component 
                        <Route path="/tickets/new" element={<PrivateRoute><NewTicket /></PrivateRoute>} />
                    
                     */}
						{/* WAy 2 is the one I'm using for this APP using nested Route and rendering component on condition pass as Outlet component
                     provided by react router dom. It is especially useful when multiple nested routes require same conditional rendering*/}
						<Route path="/tickets" element={<PrivateRoute />}>
							<Route path="new" element={<NewTicket />} />
							<Route path="" element={<Tickets />} />
							<Route path=":ticketId" element={<Ticket />} />
						</Route>
					</Routes>
				</div>
			</Router>
			{/* A dummy div to take space at bottom to ensure last element is fully visible on scroll */}
			<div
				style={{
					visibility: "hidden",
					marginBottom: "10px",
					padding: "10px",
				}}
			/>
			<ToastContainer />
		</>
	);
};
export default App;
