import { combineReducers } from "redux";
import userReducer from "./userReducer";
import { notesReducer } from "./notesReducer";
import { noteReducer } from "./noteReducer";

const rootReducers = combineReducers({
  user: userReducer,
  notes: notesReducer,
  note: noteReducer,
});
export default rootReducers;
