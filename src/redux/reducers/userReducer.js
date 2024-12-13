const initialState = {
  data: null,
  loading: true,
  error: null,
};

export default function userReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case "LOAD_USER": {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }
    case "USER/FETCH/START": {
      return { ...state, loading: true };
    }
    case "USER/FETCH/SUCCESS": {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }
    case "USER/FETCH/ERROR": {
      return {
        ...state,

        loading: false,
        error: action.payload,
      };
    }
    case "LOG_OUT_USER": {
      return {
        data: null,

        loading: false,
        error: null,
      };
    }

    default:
      return state;
  }
}
