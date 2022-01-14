import axios, { userConfig } from '..';
import { FETCH_SUGGESTION_SUCCESS, FETCH_SUGGESTION_FAILED } from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    const response = await axios.get('/users/suggestions', userConfig);

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_SUGGESTION_SUCCESS,
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

    dispatch({ type: FETCH_SUGGESTION_FAILED, error });
  }
};
