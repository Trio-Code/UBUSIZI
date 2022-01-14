import axios, { userConfig } from '..';
import { FETCH_MORE_POSTS_SUCCESS, FETCH_MORE_POSTS_FAILED, CLEAR_FETCH_MORE_POSTS } from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_FETCH_MORE_POSTS });
    const response = await axios.get(`/users/${id}`, userConfig);

    const {
      data: { message, data, },
    } = response;

    dispatch({ type: FETCH_MORE_POSTS_SUCCESS, message, data });
  } catch (err) {
    let error = {};
    if (err.response) {
      const {
        data: { message, status },
      } = err.response;
      error = { message, status };
    } else {
      error = {
        message: err.message,
        status: '500',
      };
    }
    dispatch({ type: FETCH_MORE_POSTS_FAILED, error });
  }
};
