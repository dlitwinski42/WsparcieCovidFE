export const paths = {
  accountView: "/account",
  donationView: "/donation",
  entrepreneurView: "/entrepreneur",
  entrepreneurList: "/",
  login: "/login",
  registration: "/register",
};

const ENTREPRENEUR_CONTROLLER = "entrepreneur";
const AUTHENTICATE = "authenticate";
const USER = "user";

export const API_BASE_URL = "https://localhost:5001";

const createURL = (controller, endpoint) =>
  `${API_BASE_URL}/${controller}${endpoint ? `/${endpoint}` : ""}`;

export const ENDPOINT = {
  entrepreneurList: createURL(ENTREPRENEUR_CONTROLLER),
  authenticate: createURL(AUTHENTICATE),
  addUser: createURL(USER),
};

export const REQUEST_STATUS = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
  IDLE: "IDLE",
};
