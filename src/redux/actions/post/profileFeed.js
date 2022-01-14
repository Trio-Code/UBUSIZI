import axios, { userConfig } from '..';
import { PROFILE_FETCH_FEED_SUCCESS, PROFILE_FETCH_FEED_FAILED } from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    const response = await axios.get('/posts/my-posts', userConfig);

    const {
      data: { message, data, },
    } = response;

    dispatch({ type: PROFILE_FETCH_FEED_SUCCESS, message, data });
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
    dispatch({ type: PROFILE_FETCH_FEED_FAILED, error });
  }
};
