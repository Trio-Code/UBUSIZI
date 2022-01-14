import { FOLLOW_SUCCESS, FOLLOW_FAILED, CLEAR_FOLLOW } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case FOLLOW_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    case CLEAR_FOLLOW:
      return {
        ...initialState,
        status: 'clear_follow',
      };
    default:
      return state;
  }
};
