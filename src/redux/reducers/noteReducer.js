const initialState = {
  data: { title: "", body: "" },
  loading: true,
  error: false,
};

export const noteReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "NOTE_INPUT_CHANGE": {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case "NOTE/ACTION/START": {
      return { ...state, loading: true };
    }
    case "NOTE/ACTION/SUCCESS": {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }
    case "NOTE/ACTION/ERROR": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case "NOTE/DELETE/ERROR": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case "RESET_NOTE": {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};
