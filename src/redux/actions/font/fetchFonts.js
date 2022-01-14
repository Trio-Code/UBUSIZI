import axios from '..';
import { FETCH_FONTS_SUCCESS, FETCH_FONTS_FAILED } from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    const response = await axios.get('/font/all');

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_FONTS_SUCCESS,
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

    dispatch({ type: FETCH_FONTS_FAILED, error });
  }
};
