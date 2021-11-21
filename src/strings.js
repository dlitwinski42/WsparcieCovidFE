import { createUnarySpacing } from "@mui/system";

export const paths = {
  accountView: "/account",
  donationCreation: "/donation",
  giftCardCreation: "/giftcard",
  addProduct: "/addProduct",
  entrepreneurView: "/entrepreneur",
  entrepreneurList: "/",
  login: "/login",
  registration: "/register",
  orderCreation: "/order",
};

const ENTREPRENEUR = "entrepreneur";
const AUTHENTICATE = "authenticate";
const DONATION = "donation";
const GIFTCARD = "giftcard";
const ADDPRODUCT = "addProduct";
const USER = "user";
const PRODUCT = "product";
const CONTRIBUTOR = "contributor";
const ORDER = "order";
const ACTIVE = "active";
const AVAILABLE = "available";

export const API_BASE_URL = "https://localhost:5001";

const createURL = (controller, endpoint) =>
  `${API_BASE_URL}/${controller}${endpoint ? `/${endpoint}` : ""}`;

export const ENDPOINT = {
  entrepreneurList: createURL(ENTREPRENEUR),
  authenticate: createURL(AUTHENTICATE),
  addUser: createURL(USER),
  addProduct: createURL(ORDER, ADDPRODUCT),
  createDonation: createURL(DONATION),
  createGiftCard: createURL(GIFTCARD),
  createProduct: createURL(PRODUCT),
  createOrder: createURL(ORDER),
  confirmDonation: createURL(DONATION),
  confirmGiftCard: createURL(GIFTCARD),
  getProducts: createURL(PRODUCT, ENTREPRENEUR),
  getActiveDonations: createURL(DONATION, ACTIVE),
  getActiveGiftCards: createURL(GIFTCARD, ACTIVE),
  getActiveOrders: createURL(ORDER, ACTIVE),
  getAvailableGiftCards: createURL(GIFTCARD, AVAILABLE),
  getContributor: createURL(CONTRIBUTOR),
};

export const REQUEST_STATUS = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
  IDLE: "IDLE",
};
