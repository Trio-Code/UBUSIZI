/* eslint-disable object-curly-newline */
import axios from '..';
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILED } from '../../actionTypes';

export default (body) => async (dispatch) => {
  try {
    const response = await axios.post('/users/login', body);

    const {
      data: {
        message,
        data: { token, _id, username, profilePicture, firstname, lastname },
      },
    } = response;
    const fullname = `${firstname} ${lastname}`;
    const userData = { picture: profilePicture, username, fullname };
    dispatch({
      type: USER_LOGIN_SUCCESS,
      message,
      token,
      id: _id,
      results: userData,
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

    dispatch({ type: USER_LOGIN_FAILED, error });
  }
};
