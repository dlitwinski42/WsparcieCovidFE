import { createUnarySpacing } from "@mui/system";

export const paths = {
  accountView: "/account",
  contributorHistory: "/contributorHistory",
  donationCreation: "/donation",
  giftCardCreation: "/giftcard",
  addProduct: "/addProduct",
  entrepreneurView: "/entrepreneur",
  entrepreneurList: "/",
  entrepreneurHistory: "/entrepreneurHistory",
  login: "/login",
  registration: "/register",
  orderCreation: "/order",
  reviewCreation: "/review",
  reviewList: "/reviewList",
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
const REVIEW = "review";
const HISTORY = "history";
const DELIVERED = "delivered";
const USED = "used";
const CONFIRMED = "confirmed";
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
  createReview: createURL(REVIEW),
  confirmOrder: createURL(ORDER),
  confirmDonation: createURL(DONATION),
  confirmGiftCard: createURL(GIFTCARD),
  getReviews: createURL(REVIEW, ENTREPRENEUR),
  getProducts: createURL(PRODUCT, ENTREPRENEUR),
  getActiveDonations: createURL(DONATION, ACTIVE),
  getConfirmedDonations: createURL(DONATION, CONFIRMED),
  getHistoryDonations: createURL(DONATION, HISTORY),
  getActiveGiftCards: createURL(GIFTCARD, ACTIVE),
  getUsedGiftCards: createURL(GIFTCARD, USED),
  getHistoryGiftCards: createURL(GIFTCARD, HISTORY),
  getActiveOrders: createURL(ORDER, ACTIVE),
  getDeliveredOrders: createURL(ORDER, DELIVERED),
  getHistoryOrders: createURL(ORDER, HISTORY),
  getAvailableGiftCards: createURL(GIFTCARD, AVAILABLE),
  getContributor: createURL(CONTRIBUTOR),
  useGiftCard: createURL(GIFTCARD),
};

export const REQUEST_STATUS = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
  IDLE: "IDLE",
};
