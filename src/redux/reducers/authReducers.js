import {USER} from '../types';

const initialState = {
  user: null,
  loading: false,
};
const authReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case USER.LOADING_START:
      return {
        ...state,
        loading: true,
      };

    case USER.FETCH_SUCCESS:
      return {
        user: payload,
        loading: false,
      };
    case USER.LOGOUT:
    case USER.FETCH_FAILED:
      return initialState;
    default: {
      return state;
    }
  }
};

export default authReducer;
