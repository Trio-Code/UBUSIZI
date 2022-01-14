import {
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILED,
  CLEAR_LIKE_POST,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case LIKE_POST_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_LIKE_POST:
      return { ...state, status: 'clear' };
    default:
      return state;
  }
};
