import { CLEAR_FORGOT_PASSWORD } from '../../actionTypes';

export default () => async (dispatch) => {
  dispatch({ type: CLEAR_FORGOT_PASSWORD });
};
