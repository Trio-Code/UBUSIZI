import { FETCH_RECENT_ACTIVITIES_SUCCESS, FETCH_RECENT_ACTIVITIES_FAILED } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECENT_ACTIVITIES_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        data: action.results,
      };
    case FETCH_RECENT_ACTIVITIES_FAILED:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
};
