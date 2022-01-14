import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  CLEAR_USER_SIGNUP,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  role: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        status: 'user_signup_success',
        message: action.message,
        token: action.token,
        role: action.role,
      };
    case USER_SIGNUP_FAILED:
      return { ...state, status: 'user_signup_error', error: action.error };
    case CLEAR_USER_SIGNUP:
      return { ...initialState, status: 'clear_sign_up' };
    default:
      return state;
  }
};
