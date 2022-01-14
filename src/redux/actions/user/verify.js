import axios from '..';
import {
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_FAILED,

} from '../../actionTypes';

export default (token) => async (dispatch) => {
  try {
    const response = await axios.put(`/users/verify-account/?token=${token}`);
    const {
      data: { message },
    } = response;
    dispatch({ type: VERIFY_ACCOUNT_SUCCESS, message });
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
        status: 500,
      };
    }
    dispatch({ type: VERIFY_ACCOUNT_FAILED, error });
  }
};
