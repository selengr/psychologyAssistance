import { USER_ASSIGN_FAILED, USER_ASSIGN_REQUEST, USER_ASSIGN_SUCCESS } from 'redux/action//types';
import { userHttp } from 'api';

export const UserAssign = (JSONData?: any) => {
  return async (dispatch) => {
    const result = await userHttp.assignToAssessment(JSONData);
    dispatch({
      type: USER_ASSIGN_REQUEST,
    });
    try {
      dispatch({
        type: USER_ASSIGN_SUCCESS,
        payload: {
          result: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: USER_ASSIGN_FAILED,
      });
    }
  };
};
