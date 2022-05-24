import { call, put, all } from "redux-saga/effects";

import api from "../services/api";

import { Creators as AuthActions } from "../reducers/userReducer";

export function* login(action) {
  try {
    // const {
    //   data: { token }
    // } = yield call(api.post, "/sessions", action.payload);

    // api.defaults.headers.common.Authorization = `Bearer ${token}`;

    yield all([put(AuthActions.loginSuccess({ token: "token-code" }))]);
  } catch (err) {
    if (err.response) {
      return yield put(AuthActions.loginFailure("Email ou senha inválidos."));
    }
    return yield put(
      AuthActions.loginFailure(
        "Houve um problema com nosso servidor, por favor tente novamente, ou mais tarde."
      )
    );
  }
}
