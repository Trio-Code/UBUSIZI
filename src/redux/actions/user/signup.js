import axios from '..';
import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  CLEAR_USER_SIGNUP,
} from '../../actionTypes';

export default (body) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_USER_SIGNUP,
    });

    const response = await axios.post('/users/signup', body);
    const {
      data: { message },
    } = response;

    dispatch({
      type: USER_SIGNUP_SUCCESS,
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

    dispatch({ type: USER_SIGNUP_FAILED, error });
  }
};
