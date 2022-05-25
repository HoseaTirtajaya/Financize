import { RECEIVE_LOGIN_DATA } from "../actions";

export default (state = {}, { type, data }) => {
  switch (type) {
    case RECEIVE_LOGIN_DATA:
      return data;
    default:
      return state;
  }
};