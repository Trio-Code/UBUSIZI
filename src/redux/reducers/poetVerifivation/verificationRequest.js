import { POET_VERIFICATION_REQUEST_SUCCESS, POET_VERIFICATION_REQUEST_FAILED } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POET_VERIFICATION_REQUEST_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case POET_VERIFICATION_REQUEST_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
};
