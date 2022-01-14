import axios, { userConfig } from '..';
import {
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILED,
  CLEAR_UNLIKE_POST,
} from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_UNLIKE_POST,
    });

    const response = await axios.put(`/likes/new/${id}`, {}, userConfig);

    const {
      data: { message },
    } = response;
    dispatch({
      type: LIKE_POST_SUCCESS,
      message,
    });
  } catch (err) {
    let error = {};
    if (err.response) {
      const {
        data: { status, message },
      } = err.response;
      error = { status, message };
    } else {
      error = {
        status: 500,
        message: err.message,
      };
    }
    dispatch({ type: LIKE_POST_FAILED, error });
  }
};
