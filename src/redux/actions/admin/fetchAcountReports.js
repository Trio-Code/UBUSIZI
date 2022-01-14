import axios, { adminConfig } from '..';
import { FETCH_ACOUNT_REPORTS_SUCCESS, FETCH_ACOUNT_REPORTS_FAILED } from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    const response = await axios.get('/reports/accounts', adminConfig);

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_ACOUNT_REPORTS_SUCCESS,
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
        message: err.message,
      };
    }

    dispatch({ type: FETCH_ACOUNT_REPORTS_FAILED, error });
  }
};
