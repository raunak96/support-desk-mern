import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { failed, idle, loading } from "../constants/status";
import { getNotes } from "../redux/note/noteSlice";
import NoteItem from "./NoteItem";
import NoteModalForm from "./NoteModalForm";
import Spinner from "./Spinner";

const NotesList = ({ ticketId, ticketStatus }) => {
	const { notes, status } = useSelector(state => state.note);
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === idle)
			dispatch(getNotes(ticketId)).unwrap().catch(toast.error);
	}, [dispatch, ticketId, status]);
	return status === loading ? (
		<Spinner />
	) : notes ? (
		<>
			{ticketStatus !== "closed" && <NoteModalForm ticketId={ticketId} />}
			{notes.map(note => (
				<NoteItem key={note._id} note={note} />
			))}
		</>
	) : (
		status === failed && (
			<h3>
				Could not get notes for this ticket at this moment. Please try
				reloading the page.
			</h3>
		)
	);
};
export default NotesList;
