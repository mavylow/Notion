import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { z } from "zod";
import { connect } from "react-redux";
import { AddNote } from "../../../redux/actions/action";
import { selectUserId } from "../../../redux/selectors/userSelector";
import { selectNote } from "../../../redux/selectors/NoteSelectors";
import { Note } from "../../../validation/zodConst";
import TextareaField from "../../../uiComponents/TextareaField";
import InputField from "../../../uiComponents/InputField";
import Button from "../../../uiComponents/Button";
import BackButton from "../../../uiComponents/BackButton";

function AddNewNote({
  note,
  userId,
  onChange,
  addNote,
  resetNote,
}) {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };
  const handleAddNote = async () => {
    try {
      Note.parse(note);

      addNote(note, userId);
      navigate("/notes");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.format());
      } else {
        setError({
          general: "Произошла ошибка, попробуйте еще раз.",
        });
      }
    }
  };
  useEffect(
    () => () => {
      resetNote();
    },
    []
  );

  return (
    <div className="w-[70vw] flex justify-center flex-col">
      <BackButton onClick={() => navigate("/notes")} />

      <div className="font-medium text-2xl text-center mb-4">
        Create note
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
          name="Create"
          onClick={handleAddNote}
          error={error?.general}
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  userId: selectUserId(state),
  note: selectNote(state),
});
const mapDispatchToProps = (dispatch) => ({
  resetNote: () =>
    dispatch({
      type: "RESET_NOTE",
    }),
  onChange: (name, value) =>
    dispatch({
      type: "NOTE_INPUT_CHANGE",
      payload: { name, value },
    }),
  addNote: (note, userId) =>
    dispatch(AddNote(note, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewNote);
