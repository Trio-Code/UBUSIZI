import {
  FETCH_COLORS_SUCCESS,
  FETCH_COLORS_FAILED,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  role: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLORS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        data: action.result,
      };
    case FETCH_COLORS_FAILED:
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
};
