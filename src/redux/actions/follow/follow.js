import axios, { userConfig } from '..';
import { FOLLOW_SUCCESS, FOLLOW_FAILED, CLEAR_UNFOLLOW } from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_UNFOLLOW });
    const response = await axios.put(`/users/${id}/follow`, {}, userConfig);
    const {
      data: { message },
    } = response;

    dispatch({ type: FOLLOW_SUCCESS, message });
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
    dispatch({ type: FOLLOW_FAILED, error });
  }
};
