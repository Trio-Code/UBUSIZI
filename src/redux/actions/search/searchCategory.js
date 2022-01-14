import axios, { userConfig } from '..';
import {
  SEARCH_CATEGORY_SUCCESS,
  SEARCH_CATEGORY_FAILED,
  CLEAR_SEARCH,
} from '../../actionTypes';

export default (query) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_SEARCH });

    const response = await axios.get(
      `/search/category?q=${query}&page=1&limit=200`, userConfig
    );

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: SEARCH_CATEGORY_SUCCESS,
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
      error = {
        status: 500,
        message: err.message,
      };
    }
    dispatch({ type: SEARCH_CATEGORY_FAILED, error });
  }
};
