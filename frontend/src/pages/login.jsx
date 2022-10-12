import { useForm } from "react-hook-form";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { loginUser } from "../redux/authSlice";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const dispatch = useDispatch();
	const { isLoading, user } = useSelector(state => state.auth);
	const navigate = useNavigate();

	const onSubmit = userData => {
		dispatch(loginUser(userData))
			.unwrap()
			.then(user => {
				toast.success(`Welcome back ${user.name}!.`);
				navigate("/");
			})
			.catch(errorMessage => {
				toast.error(errorMessage);
				reset();
			});
	};
	if (isLoading) return <Spinner />;
	return user ? (
		<Navigate to="/" />
	) : (
		<>
			<section className="heading">
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please login to your account</p>
			</section>
			<section className="form">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							{...register("email", {
								required: "Email is required",
							})}
							placeholder="Enter email address"
						/>
						{errors.email && (
							<p className="error">{errors.email.message}</p>
						)}
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							{...register("password", {
								required: "Password is required",
							})}
							placeholder="Password"
						/>
						{errors.password && (
							<p className="error">{errors.password.message}</p>
						)}
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-block">
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	);
};
export default Login;
