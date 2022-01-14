import axios, { userConfig } from '..';
import { FETCH_NOTIFICATION_SUCCESS, FETCH_NOTIFICATION_FAILED } from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    const response = await axios.get('/users/activity', userConfig);

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_NOTIFICATION_SUCCESS,
      message,
      results: data,
    });
  } catch (err) {
    let error = {};
    if (err.response) {
      const {
        data: { status, message },
      } = err.response;
      error = { status, message };
    } else {
      error = { status: '500', message: err.message };
    }
    dispatch({ type: FETCH_NOTIFICATION_FAILED, error });
  }
};
