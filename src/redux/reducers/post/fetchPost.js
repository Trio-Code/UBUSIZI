import { FETCH_POST_SUCCESS, FETCH_POST_FAILED,CLEAR_FETCH_POST } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        data: action.data,
      };
    case FETCH_POST_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };

      case CLEAR_FETCH_POST:
      return {
        ...initialState,
        status: 'CLEAR_FETCH_POST',
      };
    default:
      return state;
  }
};
