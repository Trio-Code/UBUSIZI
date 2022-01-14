import axios, { userConfig } from '..';
import { USER_COMMENT_SUCCESS, USER_COMMENT_FAILED,CLEAR_COMMENT } from '../../actionTypes';

export default (body, id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_COMMENT });
    const response = await axios.post(`/comments/new/${id}`, body, userConfig);
    const {
      data: { message, data },
    } = response;
    dispatch({
      type: USER_COMMENT_SUCCESS,
      message,
      results: data,
    });
    dispatch({ type: CLEAR_COMMENT });
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
    dispatch({ type: USER_COMMENT_FAILED, error });
  }
};
