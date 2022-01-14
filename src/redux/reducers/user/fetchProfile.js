import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
  CLEAR_FETCH_PROFILE,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  results: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        results: action.results,
      };

    case FETCH_PROFILE_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_FETCH_PROFILE:
      return {
        ...initialState,
        status: 'clear_fetch_profile',
      };
    default:
      return state;
  }
};
