export const actionTypes = {
  FAILURE: 'FAILURE',
  CHECK_LOGIN: 'CHECK_LOGIN',
  IS_LOGIN: 'IS_LOGIN',
  USER: 'USER',
  SAVE_USER: 'SAVE_USER',
  GET_USER: 'GET_USER',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  CLEAR_USER: 'CLEAR_USER',
  LANGUAGE: 'LANGUAGE',
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  GET_LANGUAGE: 'GET_LANGUAGE',
  GET_LANGUAGE_SUCCESS: 'GET_LANGUAGE_SUCCESS',
}

export function userLogin(payload){
  return { type: actionTypes.SAVE_USER, payload }
};
export function isLogin(payload){
  return { type: actionTypes.CHECK_LOGIN, payload }
};
export function getUser(payload){
  return { type: actionTypes.GET_USER, payload }
};
export function changeLanguage(payload) {
  return { type: actionTypes.CHANGE_LANGUAGE, payload }
};
export function getLanguage() {
  return { type: actionTypes.GET_LANGUAGE }
};








