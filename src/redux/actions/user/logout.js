import { USER_LOG_OUT } from '../../actionTypes';

export default () => async (dispatch) => {
  dispatch({
    type: USER_LOG_OUT,
  });
};
