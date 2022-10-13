import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const Redirect = ({ errorMessage, redirectPath }) => {
	useEffect(() => {
		toast.error(errorMessage);
	}, [errorMessage]);
	return <Navigate to={redirectPath} />;
};

Redirect.defaultProps = {
	errorMessage: "You need to login first!",
	redirectPath: "/",
};
Redirect.propTypes = {
	errorMessage: PropTypes.string,
	redirectPath: PropTypes.string,
};
export default Redirect;
