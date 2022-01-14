import {
  FETCH_SUGGESTION_SUCCESS,
  FETCH_SUGGESTION_FAILED,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  role: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUGGESTION_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        data: action.result,
      };
    case FETCH_SUGGESTION_FAILED:
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
};
