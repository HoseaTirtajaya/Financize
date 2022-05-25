export const REQUEST_LOGIN_DATA = "REQUEST_LOGIN_DATA";
export const RECEIVE_LOGIN_DATA = "RECEIVE_LOGIN_DATA";

export const requestLoginData = (email, password) => ({ type: REQUEST_LOGIN_DATA });
export const receiveLoginData = user => ({ type: RECEIVE_LOGIN_DATA, user });