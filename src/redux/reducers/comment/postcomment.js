import {
  USER_COMMENT_SUCCESS,
  USER_COMMENT_FAILED,CLEAR_COMMENT,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_COMMENT_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };

    case USER_COMMENT_FAILED:
      return { ...state, status: 'error', error: action.error };

      case CLEAR_COMMENT:
      return {
        ...initialState,
        status: '',
      };
    default:
      return state;
  }
};
