const initialState = {
  data: [],
  loading: true,
  error: null,
  pages: null,
  page: Number(localStorage.getItem("currentPage")) || 1,
};

export const notesReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "NOTES/FETCH/START": {
      return { ...state, loading: true };
    }
    case "NOTES/FETCH/SUCCESS": {
      return {
        ...state,
        data: action.payload.notes,
        pages: action.payload.pages,
        loading: false,
      };
    }
    case "NOTES/FETCH/ERROR": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case "SET/PAGE": {
      return {
        ...state,
        page: action.payload,
      };
    }

    default:
      return state;
  }
};
