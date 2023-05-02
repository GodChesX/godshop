import { createStore, applyMiddleware,compose } from "redux";
import createSagaMiddleWare from "redux-saga";
import thunk from 'redux-thunk'
import {createWrapper} from 'next-redux-wrapper';
import rootReducer from "./reducer";
import rootSaga from "./saga";
// import { checkLoginMiddleware } from "./middleware";

export const makeStore = () => {

    const initialiseSagaMiddleware = createSagaMiddleWare();

    const store = createStore(
        rootReducer,
        applyMiddleware(initialiseSagaMiddleware)
        );

    store.sagaTask = initialiseSagaMiddleware.run(rootSaga);

    return store;
}


export const wrapper = createWrapper(makeStore, {debug: true});
