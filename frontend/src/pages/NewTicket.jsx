import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { generateTicket } from "../redux/ticket/ticketSlice";

const NewTicket = () => {
	const {
		user: { name, email },
	} = useSelector(state => state.auth);
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onSubmit = async ticketData => {
		try {
			setIsLoading(true);
			await dispatch(generateTicket(ticketData)).unwrap();
			toast.success("New ticket created!");
			navigate("/tickets");
		} catch (errorMessage) {
			toast.error(errorMessage);
		} finally {
			reset();
			setIsLoading(false);
		}
	};

	return (
		<>
			{isLoading && <Spinner />}
			<BackButton />
			<section className="heading">
				<h1>Create new Ticket</h1>
				<p>Please fill out the form below.</p>
			</section>
			<section className="form">
				<div className="form-group">
					<label htmlFor="name">Customer Name</label>
					<input
						type="text"
						className="form-control"
						value={name}
						disabled
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Customer Email</label>
					<input type="text" value={email} disabled />
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<label htmlFor="product">Product</label>
						<select
							id="product"
							{...register("product")}
							defaultValue="iPhone">
							<option value="iPhone">iPhone</option>
							<option value="Macbook Pro">Macbook Pro</option>
							<option value="iMac">iMac</option>
							<option value="iPad">iPad</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="description">
							Description of the issue
						</label>
						<textarea
							id="description"
							placeholder="Description"
							{...register("description", {
								required: "description is required",
							})}></textarea>
						{errors.description && (
							<p className="error">
								{errors.description.message}
							</p>
						)}
					</div>
					<div className="form-group">
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</section>
		</>
	);
};
export default NewTicket;
