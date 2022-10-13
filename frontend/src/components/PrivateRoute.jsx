import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Redirect from "./Redirect";

const PrivateRoute = () => {
	const { user } = useSelector(state => state.auth);

	return user ? <Outlet /> : <Redirect />;
};
export default PrivateRoute;
