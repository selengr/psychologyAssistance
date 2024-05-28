import * as Types from '../../../../action/types';

const INITIAL_EDIT = {
  data: '',
  loading: false,
  error: '',
};
// const { state, message } = action.payload;

export const Group_Edit_Reducer = (state = INITIAL_EDIT, action: any) => {
  switch (action.type) {
    case Types.USER_EDIT_REQUEST: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case Types.USER_EDIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: 'دریافت شد',
        data: action.payload.result,
      };
    }
    case Types.USER_EDIT_FAILED: {
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
