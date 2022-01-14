import axios, { adminConfig } from '..';
import { FETCH_POST_REPORTS_SUCCESS, FETCH_POST_REPORTS_FAILED } from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    const response = await axios.get('/reports/posts', adminConfig);

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_POST_REPORTS_SUCCESS,
      message,
      result: data,
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
        message: err.messa,
      };
    }

    dispatch({ type: FETCH_POST_REPORTS_FAILED, error });
  }
};
