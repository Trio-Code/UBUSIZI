import { ADMIN_LOG_OUT } from '../../actionTypes';

export default () => async (dispatch) => {
  dispatch({
    type: ADMIN_LOG_OUT,
  });
};
