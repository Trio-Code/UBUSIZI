import axios, { userConfig } from '..';
import { FETCH_POST_SUCCESS, FETCH_POST_FAILED, CLEAR_DELETE_COMMENT,CLEAR_FETCH_POST } from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    
    const response = await axios.get(`/posts/single/${id}`, userConfig);

    const {
      data: { message, data, },
    } = response;

    dispatch({ type: FETCH_POST_SUCCESS, message, data });
    dispatch({ type: CLEAR_FETCH_POST });
  } catch (err) {
    let error = {};
    if (err.response) {
      const {
        data: { message, status },
      } = err.response;
      error = { message, status };
    } else {
      error = {
        message: err.message,
        status: '500',
      };
    }
    dispatch({ type: FETCH_POST_FAILED, error });
    dispatch({ type: CLEAR_DELETE_COMMENT });
  }
};
