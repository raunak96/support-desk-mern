import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";

const Header = () => {
	const { user } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<header className="header">
			<div className="logo">
				<Link to="/">Support Desk</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<button
							className="btn"
							onClick={() => {
								dispatch(logout());
								navigate("/");
							}}>
							<FaSignOutAlt /> Logout
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to="/login">
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to="/register">
								<FaUser /> Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
};
export default Header;
