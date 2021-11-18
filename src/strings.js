import { createUnarySpacing } from "@mui/system";

export const paths = {
  accountView: "/account",
  donationView: "/donation",
  giftCardCreation: "/giftcard",
  addProduct: "/addProduct",
  entrepreneurView: "/entrepreneur",
  entrepreneurList: "/",
  login: "/login",
  registration: "/register",
};

const ENTREPRENEUR_CONTROLLER = "entrepreneur";
const AUTHENTICATE = "authenticate";
const DONATION = "donation";
const GIFTCARD = "giftcard";
const USER = "user";
const PRODUCT = "product";

export const API_BASE_URL = "https://localhost:5001";

const createURL = (controller, endpoint) =>
  `${API_BASE_URL}/${controller}${endpoint ? `/${endpoint}` : ""}`;

export const ENDPOINT = {
  entrepreneurList: createURL(ENTREPRENEUR_CONTROLLER),
  authenticate: createURL(AUTHENTICATE),
  addUser: createURL(USER),
  createDonation: createURL(DONATION),
  createGiftCard: createURL(GIFTCARD),
  createProduct: createURL(PRODUCT),
};

export const REQUEST_STATUS = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
  IDLE: "IDLE",
};
