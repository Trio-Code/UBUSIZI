import axios, { userConfig } from '..';
import { ADD_POST_SUCCESS, ADD_POST_FAILED } from '../../actionTypes';

export default (body) => async (dispatch) => {
  try {
    const response = await axios.post('/posts/new', body, userConfig);

    const {
      data: { message },
    } = response;

    dispatch({ type: ADD_POST_SUCCESS, message });
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
    dispatch({ type: ADD_POST_FAILED, error });
  }
};
