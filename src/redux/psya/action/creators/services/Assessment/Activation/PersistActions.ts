import { ASSESSMENT_ACTIVATION_FAILED, ASSESSMENT_ACTIVATION_REQUEST, ASSESSMENT_ACTIVATION_SUCCESS } from 'redux/action/types';
import { assessmentHttp } from 'api';

export const AssessmentActivation = (QS, JSONData?: any) => {
  return async (dispatch) => {
    dispatch({
      type: ASSESSMENT_ACTIVATION_REQUEST,
    });
    try {
      const result = await assessmentHttp.activation(QS, JSONData);
      dispatch({
        type: ASSESSMENT_ACTIVATION_SUCCESS,
        payload: {
          result: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: ASSESSMENT_ACTIVATION_FAILED,
      });
    }
  };
};
