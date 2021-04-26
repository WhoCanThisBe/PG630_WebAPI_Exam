export const NAV_PATH = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
};

const REST_API_ENDPOINT = {
  HOST: "http://localhost",
  PORT: "3000",
  BASE: "/api",
};

const ENDPOINT_TEMPLATE = {
  BASE: `${REST_API_ENDPOINT.HOST}:${REST_API_ENDPOINT.PORT}${REST_API_ENDPOINT.BASE}`,
};

export const USER_AUTH_ENDPOINT = {
  SIGNUP: `${ENDPOINT_TEMPLATE.BASE}/signup`,
  LOGIN: `${ENDPOINT_TEMPLATE.BASE}/login`,
  USER_INFO: `${ENDPOINT_TEMPLATE.BASE}/user`,
  LOGOUT: `${ENDPOINT_TEMPLATE.BASE}/logout`,
  LOGGEDIN: `${ENDPOINT_TEMPLATE.BASE}/userlist`,
};
