import { UNFOLLOW_SUCCESS, UNFOLLOW_FAILED, CLEAR_UNFOLLOW } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case UNFOLLOW_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    case CLEAR_UNFOLLOW:
      return {
        ...initialState,
        status: 'clear_unfollow',
      };
    default:
      return state;
  }
};
