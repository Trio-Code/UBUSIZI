import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOG_OUT,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        status: 'user_login_success',
        message: action.message,
        token: action.token,
        results: action.results,
        id: action.id
      };
    case USER_LOGIN_FAILED:
      return { ...state, status: 'user_login_error', error: action.error };
    case USER_LOG_OUT:
      return { ...state, status: 'user_logout_success' };
    default:
      return state;
  }
};
