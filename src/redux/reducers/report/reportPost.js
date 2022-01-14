import { REPORT_POST_SUCCESS, REPORT_POST_FAILED } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REPORT_POST_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case REPORT_POST_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
};
