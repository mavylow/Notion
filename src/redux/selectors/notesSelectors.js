export const selectNotesPerPage = (state) =>
  state.notes.data;

export const selectPage = (state) => state.notes.page;

export const selectPages = (state) => state.notes.pages;
