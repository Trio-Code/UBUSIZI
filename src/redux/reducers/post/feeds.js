import { FETCH_FEED_SUCCESS, FETCH_FEED_FAILED } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEED_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        data: action.data,
      };
    case FETCH_FEED_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
};
