import axios, { userConfig } from '..';
import { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILED } from '../../actionTypes';

export default (body) => async (dispatch) => {
  try {
    const response = await axios.put('/users/update/change-password', body, userConfig);

    const {
      data: {
        message,
      },
    } = response;
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
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
        message: err.error,
      };
    }

    dispatch({ type: CHANGE_PASSWORD_FAILED, error });
  }
};
