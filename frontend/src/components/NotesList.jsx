import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getNotes } from "../redux/note/noteSlice";
import NoteItem from "./NoteItem";
import NoteModalForm from "./NoteModalForm";
import Spinner from "./Spinner";

const NotesList = ({ ticketId, status }) => {
	const { notes, isLoading } = useSelector(state => state.note);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getNotes(ticketId)).unwrap().catch(toast.error);
	}, [dispatch, ticketId]);
	return isLoading ? (
		<Spinner />
	) : notes ? (
		<>
			{status !== "closed" && <NoteModalForm ticketId={ticketId} />}
			{notes.map(note => (
				<NoteItem key={note._id} note={note} />
			))}
		</>
	) : (
		<p>
			Could not retrieve the notes for this ticket due to some internal
			error. We apologize for the inconvenience. Please try again later.
		</p>
	);
};
export default NotesList;
