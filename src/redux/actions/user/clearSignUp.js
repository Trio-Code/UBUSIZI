import { CLEAR_USER_SIGNUP } from '../../actionTypes';

export default () => async (dispatch) => {
  dispatch({ type: CLEAR_USER_SIGNUP });
};
