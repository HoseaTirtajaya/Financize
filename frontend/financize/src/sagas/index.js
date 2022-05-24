import { all, takeLatest } from "redux-saga/effects";

import { Types as AuthTypes } from "../reducers/userReducer";

import { login } from "./auth";

export default function* rootSaga() {
  yield all([takeLatest(AuthTypes.LOGIN_REQUEST, login)]);
}
