import axios, { userConfig } from '..';
import { FETCH_FEED_SUCCESS, FETCH_FEED_FAILED } from '../../actionTypes';

export default (page) => async (dispatch) => {
  try {
    const response = await axios.get(`/posts/all?page=${page}&limit=10`, userConfig);
    const {
      data: { message, data, },
    } = response;

    dispatch({ type: FETCH_FEED_SUCCESS, message, data });
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
    dispatch({ type: FETCH_FEED_FAILED, error });
  }
};
