import axios, { userConfig } from '..';
import { DELETE_POST_SUCCESS, DELETE_POST_FAILED } from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/posts/delete/${id}`, userConfig);
    const {
      data: { message },
    } = response;
    dispatch({ type: DELETE_POST_SUCCESS, message });
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
    dispatch({ type: DELETE_POST_FAILED, error });
  }
};
