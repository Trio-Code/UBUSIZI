import {
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_FAILED,

} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_ACCOUNT_SUCCESS:
      return {
        ...state,
        status: 'verify_account_success',
        message: action.message,
      };
    case VERIFY_ACCOUNT_FAILED:
      return { ...state, status: 'verify_account_error', error: action.error };
    default:
      return state;
  }
};
