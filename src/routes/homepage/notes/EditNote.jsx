import { useEffect, useState } from "react";

import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { selectNote } from "../../../redux/selectors/NoteSelectors";
import {
  editNote,
  fetchNote,
} from "../../../redux/actions/action";
import { Note } from "../../../validation/zodConst";
import TextareaField from "../../../uiComponents/TextareaField";
import InputField from "../../../uiComponents/InputField";
import Button from "../../../uiComponents/Button";
import BackButton from "../../../uiComponents/BackButton";

function EditNote({
  note,
  loading,
  onChange,
  fetchNote,
  editNote,
  resetNote,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNote(id);
    return () => {
      resetNote();
    };
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleEditNote = () => {
    try {
      Note.parse(note);

      editNote(id, note);
      navigate("/notes");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.format());
      }
    }
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div className="w-[70vw] flex justify-center flex-col">
      <BackButton onClick={() => navigate("/notes")} />
      <div className="font-medium text-2xl text-center mb-4">
        Edit note
      </div>

      <div className="flex flex-col max-h-[60vh] h-[50vh] gap-2 justify-center">
        <InputField
          name="title"
          placeholder="Name"
          value={note.title}
          onChange={handleChangeInput}
          error={error?.title?._errors[0]}
        />
        <TextareaField
          value={note.body}
          name="body"
          placeholder="Note details..."
          onChange={handleChangeInput}
          error={error?.body ? error.body._errors[0] : null}
        />
      </div>

      <div className="flex justify-center mt-4">
        <Button
          name="Edit"
          onClick={handleEditNote}
          error={error?.general}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  note: selectNote(state),
  loading: state.note.loading,
});
const mapDispatchToProps = (dispatch) => ({
  resetNote: () =>
    dispatch({
      type: "RESET_NOTE",
    }),
  fetchNote: (noteId) => dispatch(fetchNote(noteId)),
  onChange: (name, value) =>
    dispatch({
      type: "NOTE_INPUT_CHANGE",
      payload: { name, value },
    }),
  editNote: (id, note) => dispatch(editNote(id, note)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNote);
