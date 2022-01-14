import { DELETE_POST_SUCCESS, DELETE_POST_FAILED, CLEAR_DELETE_POST } from '../../actionTypes';

const initialState = {
  status: '',
  message: ''
};
export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message
      };
    case DELETE_POST_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error
      };
    case CLEAR_DELETE_POST:
      return { ...initialState, status: 'clear' };
    default:
      return state;
  }
};
