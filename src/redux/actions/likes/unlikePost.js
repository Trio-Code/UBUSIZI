import axios, { userConfig } from '..';
import {
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILED,
  CLEAR_LIKE_POST,
} from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_LIKE_POST,
    });

    const response = await axios.put(
      `/likes/unlike/${id}`,
      {},
      userConfig
    );

    const {
      data: { message },
    } = response;
    dispatch({
      type: UNLIKE_POST_SUCCESS,
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
    dispatch({ type: UNLIKE_POST_FAILED, error });
  }
};
