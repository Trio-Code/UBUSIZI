import axios, { userConfig } from '..';
import { POET_VERIFICATION_REQUEST_SUCCESS, POET_VERIFICATION_REQUEST_FAILED } from '../../actionTypes';

export default (body) => async (dispatch) => {
  try {
    const response = await axios.post('/verifications/request', body, userConfig);

    const {
      data: { message },
    } = response;

    dispatch({ type: POET_VERIFICATION_REQUEST_SUCCESS, message });
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
    dispatch({ type: POET_VERIFICATION_REQUEST_FAILED, error });
  }
};
