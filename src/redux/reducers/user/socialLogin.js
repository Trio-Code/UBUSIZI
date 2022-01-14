import { SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAILED } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        status: 'social_login_success',
        message: action.message,
        token: action.token,
        results: action.results,
        id: action.id,
      };
    case SOCIAL_LOGIN_FAILED:
      return { ...state, status: 'social_login_error', error: action.error };
    default:
      return state;
  }
};
