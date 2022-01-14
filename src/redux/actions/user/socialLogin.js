/* eslint-disable object-curly-newline */
import axios from '..';
import { SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAILED } from '../../actionTypes';

export default (body) => async (dispatch) => {
  try {
    const response = await axios.post('/users/social-login', body);

    const {
      data: {
        message,
        data: { token, _id, username, profilePicture, firstname, lastname },
      },
    } = response;
    const fullname = `${firstname} ${lastname}`;
    const userData = { picture: profilePicture, username, fullname };
    dispatch({
      type: SOCIAL_LOGIN_SUCCESS,
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

    dispatch({ type: SOCIAL_LOGIN_FAILED, error });
  }
};
