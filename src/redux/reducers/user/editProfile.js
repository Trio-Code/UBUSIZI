import {
  USER_EDIT_PROFILE_SUCCESS,
  USER_EDIT_PROFILE_FAILED
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        data: action.data
      };
    case USER_EDIT_PROFILE_FAILED:
      return { ...state, status: 'failed', error: action.error };

    default:
      return state;
  }
};
