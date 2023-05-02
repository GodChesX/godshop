import { call, all, put, take, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import Router from 'next/router';
import moment from 'moment';
import helper from "../helper/global"
// const locate =  require('../language/index').default;

import { actionTypes } from './actions'

export default function* watcherSaga() {
    yield takeEvery(actionTypes.SAVE_USER, loginSaga);
    yield takeEvery(actionTypes.CHECK_LOGIN, checkLoginSage);
    yield takeEvery(actionTypes.GET_USER, getUserSage);
    yield takeEvery(actionTypes.CLEAR_USER, logoutSaga);
    yield takeEvery(actionTypes.GET_LANGUAGE, getLanguageSaga);
    yield takeEvery(actionTypes.CHANGE_LANGUAGE, changeLanguageSaga);
}


function* loginSaga(payload){
    try{
        helper.sessionSave('user',payload);
        helper.sessionSave('is_login',true);
        yield put({type:actionTypes.USER, payload:payload});
    }catch (e){
        yield put({ type: actionTypes.FAILUER, payload: e})
    }
}
function* logoutSaga(){
    try{
        helper.sessionRemove('user');
        helper.sessionRemove('is_login');
        yield put({type:actionTypes.USER, payload:false});
    }catch (e) {
        yield put({ type: actionTypes.FAILUER, payload: e})

    }
}
function* checkLoginSage(){
    try{
        let items = helper.sessionGet('is_login');
        if (items) {
            yield put({ type: actionTypes.IS_LOGIN, payload: items });
        } else {
            yield put({ type: actionTypes.IS_LOGIN, payload: 'false' });
        }
    }catch (e){
        yield put({ type: actionTypes.FAILUER, payload: e})
    }
}
function* getUserSage(){
    try{
        let items = helper.sessionGet('user');
        if (items) {
            yield put({ type: actionTypes.GET_USER_SUCCESS, payload: items });
        } else {
            yield put({ type: actionTypes.GET_USER_SUCCESS, payload: 'false' });
        }
    }catch (e){
        yield put({ type: actionTypes.FAILUER, payload: e})
    }
}
function* changeLanguageSaga(payload){
    try{
        helper.storageSave('language',payload.payload);
        yield put({type:actionTypes.LANGUAGE, payload:payload.payload});
    }catch (e){
        yield put({ type: actionTypes.FAILUER, payload: e})
    }
}
function* getLanguageSaga(){
    try{
        let items = helper.storageGet('language');
        if (items) {
            yield put({ type: actionTypes.GET_LANGUAGE_SUCCESS, payload: items});

        } else {
            yield put({ type: actionTypes.GET_LANGUAGE_SUCCESS, payload: 'false' });
        }
    }catch (e){
        yield put({ type: actionTypes.FAILUER, payload: e})
    }
}







