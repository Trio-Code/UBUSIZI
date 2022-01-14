import {
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  CLEAR_FORGOT_PASSWORD,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, status: 'success', message: action.message };
    case FORGOT_PASSWORD_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_FORGOT_PASSWORD:
      return { ...initialState, status: 'clear_reset_password' };
    default:
      return state;
  }
};
