import axios from '..';
import {
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from '../../actionTypes';

export default (payload) => async (dispatch) => {
  try {
    const response = await axios.post('/users/reset-password', payload);
    const {
      data: { message },
    } = response;
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
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
    dispatch({ type: FORGOT_PASSWORD_FAILED, error });
  }
};
