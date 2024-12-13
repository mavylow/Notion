import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNote } from "../../../redux/actions/action";
import { selectNote } from "../../../redux/selectors/NoteSelectors";

import BackButton from "../../../uiComponents/BackButton";

function NoteDetail({ note, loading, fetchNote }) {
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchNote(id);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[70vw] flex justify-center flex-col">
      <BackButton onClick={() => navigate("/notes")} />

      <div className="font-medium text-2xl text-center mb-4 ">
        {note.title}
      </div>

      <div className=" p-2 flex flex-col max-h-[60vh] h-[50vh] gap-2 justify-start items-start overflow-auto bg-slate-200 px-2 whitespace-pre-wrap">
        {note.body}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  note: selectNote(state),
  loading: state.note.loading,
});
const mapDispatchToProps = (dispatch) => ({
  fetchNote: (noteId) => dispatch(fetchNote(noteId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteDetail);
