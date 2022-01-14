import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILED,
  ADMIN_LOG_OUT,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  role: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        status: 'admin_login_success',
        message: action.message,
        token: action.token,
        role: action.role,
      };
    case ADMIN_LOGIN_FAILED:
      return { ...state, status: 'admin_login_error', error: action.error };
    case ADMIN_LOG_OUT:
      return { ...state, status: 'admin_logout_success' };
    default:
      return state;
  }
};
