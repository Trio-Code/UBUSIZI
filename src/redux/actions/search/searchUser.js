import axios , { userConfig } from '..';
import {
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILED,
  CLEAR_SEARCH,
} from '../../actionTypes';

export default (query, page) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_SEARCH });

    const response = await axios.get(
      `/search/user?q=${query}&page=${page}&limit=2`,userConfig
    );

    const {
      data: { message, data },
    } = response;
    dispatch({
      type: SEARCH_USERS_SUCCESS,
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
    dispatch({ type: SEARCH_USERS_FAILED, error });
  }
};
