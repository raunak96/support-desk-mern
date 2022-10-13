import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createNote } from "../redux/note/noteSlice";

const customStyles = {
	content: {
		width: "600px",
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		position: "relative",
	},
};

Modal.setAppElement("#root"); // attach modal to root

const NoteModalForm = ({ ticketId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const closeModal = () => setIsModalOpen(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm();
	const dispatch = useDispatch();

	const onSubmit = async noteData => {
		try {
			await dispatch(createNote({ ticketId, noteData })).unwrap();
			reset();
			closeModal();
		} catch (error) {
			toast.error(error);
		}
	};
	return (
		<>
			<button className="btn" onClick={() => setIsModalOpen(true)}>
				<FaPlus /> Add Note
			</button>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Add Note">
				<h2>Add Note</h2>
				<button className="btn-close" onClick={closeModal}>
					<MdClose />
				</button>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<textarea
							placeholder="Note description"
							{...register("text", {
								required:
									"A description if your issue is required.",
							})}></textarea>
						{errors.text && (
							<p className="error">{errors.text.message}</p>
						)}
					</div>
					<div className="form-group">
						<button className="btn" disabled={isSubmitting}>
							Submit
						</button>
					</div>
				</form>
			</Modal>
		</>
	);
};
export default NoteModalForm;
