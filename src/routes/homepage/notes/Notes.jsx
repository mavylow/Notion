import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import NotePreview from "./NotePreview";
import { connect } from "react-redux";
import {
  DeleteNote,
  fetchNotes,
} from "../../../redux/actions/action";
import {
  selectNotesPerPage,
  selectPage,
  selectPages,
} from "../../../redux/selectors/notesSelectors";
import { selectUserId } from "../../../redux/selectors/userSelector";

function Notes({
  userId,
  notes,
  page,
  pages,
  fetchNotes,
  changePage,
  deleteNote,
}) {
  const NOTE_HEIGHT_PX = 44;
  const ITEMS_PER_PAGE = Math.floor(
    (window.innerHeight / NOTE_HEIGHT_PX) * 0.4
  );
  const pagination = Array.from(
    { length: pages },
    (_, i) => i + 1
  );

  useEffect(() => {
    if (userId) {
      fetchNotes(userId, page, ITEMS_PER_PAGE);
    }
  }, [page]);

  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);

  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId);
    fetchNotes(userId, page, ITEMS_PER_PAGE);
  };

  return (
    <div className=" flex flex-col justify-start items-center gap-2 mb-5 ">
      <div className="text-xl font-medium">Notes</div>
      <NavLink
        className="bg-slate-500 text-neutral-100 px-4 py-1"
        to={"/notes/add"}
        replace
      >
        Add new Note
      </NavLink>
      <div className=" flex flex-col  gap-2 min-h-[45vh] ">
        {notes?.length > 0 ? (
          notes.map((note) => (
            <NotePreview
              key={note.id}
              {...note}
              userId={userId}
              onDelete={handleDeleteNote}
            />
          ))
        ) : (
          <div>Заметки не найдены</div>
        )}
      </div>
      <div className="flex flex-row gap-2">
        {page > 1 && (
          <button
            onClick={() => changePage(page - 1)}
            className="text-xs  py-2 px-2 h-4 flex items-center justify-center cursor-pointer bg-slate-200 font-bold  rounded transition duration-200  hover:bg-slate-100"
          >
            {"⟵ Назад"}
          </button>
        )}
        <div className="flex flex-row gap-2 w-">
          {pagination.map((pageIndex) => (
            <div
              key={pageIndex}
              className={`w-4 h-4 flex items-center justify-center cursor-pointer 
              ${
                page === pageIndex
                  ? "bg-slate-300 font-bold"
                  : "bg-slate-200 hover:bg-slate-100"
              } 
              rounded transition duration-200`}
              onClick={() => changePage(pageIndex)}
            >
              <div className="text-xs">{pageIndex}</div>
            </div>
          ))}
        </div>

        {page < pages && (
          <button
            onClick={() => changePage(page + 1)}
            className="text-xs  py-2 px-2 h-4 flex items-center justify-center cursor-pointer bg-slate-200 font-bold  rounded transition duration-200  hover:bg-slate-100"
          >
            {"Вперед ⟶"}
          </button>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  notes: selectNotesPerPage(state),
  userId: selectUserId(state),
  page: selectPage(state),
  pages: selectPages(state),
});
const mapDispatchToProps = (dispatch) => ({
  deleteNote: (noteId) => dispatch(DeleteNote(noteId)),

  fetchNotes: (userId, page, ITEMS_PER_PAGE) =>
    dispatch(fetchNotes(userId, page, ITEMS_PER_PAGE)),
  changePage: (page) =>
    dispatch({
      type: "SET/PAGE",
      payload: page,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
