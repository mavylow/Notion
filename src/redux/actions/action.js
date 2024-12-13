import { getNote, getNotes, getUser } from "./api";

export const fetchUser = (id) => async (dispatch) => {
  dispatch({ type: "USER/FETCH/START" });
  try {
    const user = await getUser(id);

    dispatch({
      type: "USER/FETCH/SUCCESS",
      payload: user[0],
    });
  } catch (e) {
    dispatch({ type: "USER/FETCH/ERROR", payload: e });
  }
};

export const fetchNotes =
  (id, page, ITEMS_PER_PAGE) => async (dispatch) => {
    dispatch({ type: "NOTES/FETCH/START" });
    try {
      const notes = await getNotes(
        id,
        page,
        ITEMS_PER_PAGE
      );

      dispatch({
        type: "NOTES/FETCH/SUCCESS",
        payload: { notes: notes.data, pages: notes.pages },
      });
    } catch (e) {
      dispatch({ type: "NOTES/FETCH/ERROR", payload: e });
    }
  };

export const fetchNote = (id) => async (dispatch) => {
  dispatch({ type: "NOTE/ACTION/START" });
  try {
    const note = await getNote(id);

    dispatch({
      type: "NOTE/ACTION/SUCCESS",
      payload: note[0],
    });
  } catch (e) {
    dispatch({ type: "NOTE/ACTION/ERROR", payload: e });
  }
};

export const editNote = (id, note) => async (dispatch) => {
  dispatch({ type: "NOTE/ACTION/START" });

  try {
    const response = await fetch(
      `http://localhost:5138/notes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка сети");
    }

    const updatedNote = await response.json();

    dispatch({
      type: "NOTE/ACTION/SUCCESS",
      payload: updatedNote,
    });
  } catch (error) {
    dispatch({
      type: "NOTE/ACTION/ERROR",
      payload: error.message,
    });
  }
};

export const AddNote =
  (note, userId) => async (dispatch) => {
    dispatch({ type: "NOTE/ACTION/START" });

    try {
      const response = await fetch(
        "http://localhost:5138/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            title: note.title,
            body: note.body,
            createdAt: Date.now(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка сети");
      }

      const addedNote = await response.json();

      dispatch({
        type: "NOTE/ACTION/SUCCESS",
        payload: addedNote,
      });
    } catch (error) {
      dispatch({
        type: "NOTE/ACTION/ERROR",
        payload: error.message,
      });
    }
  };

export const DeleteNote = (noteId) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:5138/notes/${noteId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка сети");
    }
  } catch (error) {
    dispatch({
      type: "NOTE/DELETE/ERROR",
      payload: error.message,
    });
  }
};
