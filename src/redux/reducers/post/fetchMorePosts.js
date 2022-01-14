import { FETCH_MORE_POSTS_SUCCESS, FETCH_MORE_POSTS_FAILED, CLEAR_FETCH_MORE_POSTS } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MORE_POSTS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        data: action.data,
      };
    case FETCH_MORE_POSTS_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    case CLEAR_FETCH_MORE_POSTS:
      return {
        ...initialState,
        status: 'clear_fetch_more',
      };
    default:
      return state;
  }
};
