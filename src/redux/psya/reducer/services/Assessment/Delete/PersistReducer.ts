import * as Types from 'redux/action/types';

const INITIAL_ASSESSMENT_DELETE = {
  data: '',
  loading: false,
  error: '',
};

export const Assessment_Delete_Reducer = (state = INITIAL_ASSESSMENT_DELETE, action: any) => {
  switch (action.type) {
    case Types.ASSESSMENT_DELETE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case Types.ASSESSMENT_DELETE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: 'دریافت شد',
        data: action.payload.result,
      };
    }
    case Types.ASSESSMENT_DELETE_FAILED: {
      return {
        ...state,
        loading: false,
        error: 'دریافت نشد',
      };
    }
    default:
      return state;
  }
};
