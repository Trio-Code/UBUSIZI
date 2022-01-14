import axios, { userConfig } from '..';
import { USER_EDIT_PROFILE_SUCCESS, USER_EDIT_PROFILE_FAILED } from '../../actionTypes';

export default (payload1, payload2) => async (dispatch) => {
  try {
    let response;
    if (!payload1 && !payload2) {
      response = await axios.put('/users/update/edit-profile', null, userConfig);
    }
    if (payload1 && payload2) {
      if (payload2 === 'none') {
        response = await axios.put('/users/update/remove-photo', null, userConfig);
      } else {
        response = await axios.put('/users/update/change-photo', payload2, userConfig);
      }
      response = await axios.put('/users/update/edit-profile', payload1, userConfig);
    }
    if (!payload1 && payload2) {
      if (payload2 === 'none') {
        response = await axios.put('/users/update/remove-photo', null, userConfig);
      } else {
        response = await axios.put('/users/update/change-photo', payload2, userConfig);
      }
    }

    if (payload1 && !payload2) {
      response = await axios.put('/users/update/edit-profile', payload1, userConfig);
    }
    const {
      data: {
        message, data
      },
    } = response;
    dispatch({
      type: USER_EDIT_PROFILE_SUCCESS,
      message,
      data
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

    dispatch({ type: USER_EDIT_PROFILE_FAILED, error });
  }
};
