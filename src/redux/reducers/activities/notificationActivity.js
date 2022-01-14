import { FETCH_NOTIFICATION_SUCCESS, FETCH_NOTIFICATION_FAILED } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        data: action.results,
      };
    case FETCH_NOTIFICATION_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
};
