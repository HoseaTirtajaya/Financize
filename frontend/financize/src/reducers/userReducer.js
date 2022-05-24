export const Types = {
  LOGIN_REQUEST: "auth/LOGIN_REQUEST",
  LOGIN_SUCCESS: "auth/LOGIN_SUCCESS",
  LOGIN_FAILURE: "auth/LOGIN_FAILURE",

  LOGOUT: "auth/LOGOUT"
};

const INITIAL_STATE = {
  token: null,
  loading: false,
  error: null
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return { ...state, loading: true, error: null, token: null };
    case Types.LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload.token };
    case Types.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case Types.LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
}

export const Creators = {
  loginRequest: data => ({
    type: Types.LOGIN_REQUEST,
    payload: data
  }),
  loginSuccess: data => ({
    type: Types.LOGIN_SUCCESS,
    payload: data
  }),
  loginFailure: error => ({ type: Types.LOGIN_FAILURE, payload: { error } }),

  logout: () => ({ type: Types.LOGOUT })
};
