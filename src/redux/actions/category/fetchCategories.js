import axios from '..';
import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILED } from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    const response = await axios.get('/category/all');

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
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

    dispatch({ type: FETCH_CATEGORIES_FAILED, error });
  }
};
