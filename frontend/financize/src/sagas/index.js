import { call, put, takeLatest } from "redux-saga/effects";

import { REQUEST_LOGIN_DATA, receiveLoginData } from "../actions";
import { loginUser } from "../services/api";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loginUserData(action) {
  try {
    // do api call
    const data = yield call(loginUser);
    yield put(receiveLoginData(data));
  } catch (e) {
    console.log(e);
  }
}

/*
  Alternatively you may use takeLatest.
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export default function* mySaga() {
  yield takeLatest(REQUEST_LOGIN_DATA, loginUserData);
}