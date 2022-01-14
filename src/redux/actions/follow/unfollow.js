import axios, { userConfig } from '..';
import { UNFOLLOW_SUCCESS, UNFOLLOW_FAILED, CLEAR_FOLLOW } from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_FOLLOW });

    const response = await axios.put(`/users/${id}/unfollow`, {}, userConfig);
    const {
      data: { message },
    } = response;

    dispatch({ type: UNFOLLOW_SUCCESS, message });
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
    dispatch({ type: UNFOLLOW_FAILED, error });
  }
};
