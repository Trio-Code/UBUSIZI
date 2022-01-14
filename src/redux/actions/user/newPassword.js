import axios from '..';
import { NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAILED } from '../../actionTypes';

export default (payload, urlToken) => async (dispatch) => {
  try {
    const response = await axios.put(
      `/users/new-password?token=${urlToken}`,
      payload
    );
    const {
      data: { message },
    } = response;
    dispatch({
      type: NEW_PASSWORD_SUCCESS,
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
    dispatch({ type: NEW_PASSWORD_FAILED, error });
  }
};
