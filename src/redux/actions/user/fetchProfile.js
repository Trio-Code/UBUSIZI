import axios, { userConfig } from '..';
import {
  FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILED, CLEAR_FETCH_PROFILE,
  CLEAR_DELETE_POST
} from '../../actionTypes';

export default (username) => async (dispatch) => {
  try {
   
    let response;
    if (localStorage.getItem('UBUSIZI_USER_TOKEN')) {
      response = await axios.get(`/users/${username}`, userConfig);
    } else {
      response = await axios.get(`/users/${username}`);
    }
    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      message,
      results: data,
    });
    dispatch({ type: CLEAR_FETCH_PROFILE });
    dispatch({ type: CLEAR_DELETE_POST });
  } catch (err) {
    let error = {};
    if (err.response) {
      const {
        data: { status, message },
      } = err.response;
      error = { status, message };
    } else {
      error = { status: '500', message: err.message };
    }
    dispatch({ type: FETCH_PROFILE_FAILED, error });
  }
};
