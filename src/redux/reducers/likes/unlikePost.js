import {
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILED,
  CLEAR_UNLIKE_POST,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UNLIKE_POST_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case UNLIKE_POST_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_UNLIKE_POST:
      return { ...state, status: 'clear' };
    default:
      return state;
  }
};
