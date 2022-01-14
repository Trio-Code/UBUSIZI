import {
  FETCH_POST_REPORTS_SUCCESS,
  FETCH_POST_REPORTS_FAILED,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_REPORTS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        data: action.result

      };
    case FETCH_POST_REPORTS_FAILED:
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
};
