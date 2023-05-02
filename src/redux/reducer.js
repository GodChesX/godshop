import { HYDRATE } from 'next-redux-wrapper';
import { actionTypes } from './actions'

const initialState = {
  is_login: false,
  language: 'th',
  user: false,
};

function rootReducer(state = initialState, action) {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    }
  }

  if (action.type === actionTypes.LANGUAGE) {
    return Object.assign({}, state, {
      language: action.payload
    });
  }
  if (action.type === actionTypes.USER) {
    return Object.assign({}, state, {
      user: action.payload
    });
  }
  if (action.type === actionTypes.GET_LANGUAGE_SUCCESS) {
    return Object.assign({}, state, {
      language: action.payload
    });
  }
  if (action.type === actionTypes.GET_USER_SUCCESS) {
    return Object.assign({}, state, {
      user: action.payload
    });
  }
  if (action.type === actionTypes.IS_LOGIN) {
    return Object.assign({}, state, {
      is_login: action.payload
    });
  }

  return state;
};

export default rootReducer;
