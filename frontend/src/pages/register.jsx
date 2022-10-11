import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
		reset,
	} = useForm();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isLoading } = useSelector(state => state.auth);

	const onSubmit = formData => {
		const { confirmPassword, ...userData } = formData;
		dispatch(registerUser(userData))
			.unwrap()
			.then(user => {
				toast.success(`Registered ${user.name} as a user.`);
				navigate("/");
			})
			.catch(errorMessage => {
				toast.error(errorMessage);
				reset();
			});
	};
	return (
		<>
			<section className="heading">
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create your account</p>
			</section>
			<section className="form">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							{...register("name", {
								required: "Name is required",
							})}
							placeholder="Enter your name"
						/>
						{errors.name && (
							<p className="error">{errors.name.message}</p>
						)}
					</div>
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
						<input
							type="password"
							className="form-control"
							{...register("confirmPassword", {
								required: "Password is required",
								validate: {
									matchPasswords: value => {
										const { password } = getValues();
										return (
											password === value ||
											"Passwords should match!"
										);
									},
								},
							})}
							placeholder="Confirm Password"
						/>
						{errors.confirmPassword && (
							<p className="error">
								{errors.confirmPassword.message}
							</p>
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
export default Register;
