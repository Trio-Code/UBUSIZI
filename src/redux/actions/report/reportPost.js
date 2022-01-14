import axios, { userConfig } from '..';
import { REPORT_POST_SUCCESS, REPORT_POST_FAILED } from '../../actionTypes';

export default (id, body) => async (dispatch) => {
  try {
    const response = await axios.post(`/posts/${id}/report`, body, userConfig);
    const {
      data: { message },
    } = response;

    dispatch({ type: REPORT_POST_SUCCESS, message });
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
    dispatch({ type: REPORT_POST_FAILED, error });
  }
};
