import axios from "axios";
import { ENDPOINT, REQUEST_STATUS } from "./../strings";

class GiftCardService {
  static async create(formValues) {
    try {
      console.log("i tried");
      console.log(formValues);
      console.log(ENDPOINT.createGiftCard);
      const { data } = await axios.post(ENDPOINT.createGiftCard, formValues);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getActive(entrepreneurId) {
    try {
      console.log("i tried");
      console.log(entrepreneurId);
      console.log(ENDPOINT.getActiveGiftCards);
      const { data } = await axios.get(
        `${ENDPOINT.getActiveGiftCards}/${entrepreneurId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getReported() {
    try {
      console.log("i tried to get reported");
      console.log(ENDPOINT.getActiveGiftCards);
      const { data } = await axios.get(`${ENDPOINT.getReportedGiftCards}`);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getAvailable(entrepreneurId) {
    try {
      console.log("i tried");
      console.log(entrepreneurId);
      console.log(ENDPOINT.getAvailableGiftCards);
      const { data } = await axios.get(
        `${ENDPOINT.getAvailableGiftCards}/${entrepreneurId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getUsed(entrepreneurId) {
    try {
      console.log("Trying Used GiftCards");
      console.log(entrepreneurId);
      console.log(ENDPOINT.getUsedGiftCards);
      const { data } = await axios.get(
        `${ENDPOINT.getUsedGiftCards}/${entrepreneurId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getHistory(contributorId) {
    try {
      console.log("Trying GiftCard History");
      console.log(contributorId);
      console.log(ENDPOINT.getHistoryGiftCards);
      const { data } = await axios.get(
        `${ENDPOINT.getHistoryGiftCards}/${contributorId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async confirmGiftCard(giftcardId) {
    try {
      console.log("i tried to confirm");
      console.log(giftcardId);
      console.log(ENDPOINT.confirmGiftCard);
      const { data } = await axios.get(
        `${ENDPOINT.confirmGiftCard}/${giftcardId}/paid`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async useGiftCard(giftcardId) {
    try {
      console.log("i tried to use");
      console.log(giftcardId);
      console.log(ENDPOINT.confirmGiftCard);
      const { data } = await axios.get(
        `${ENDPOINT.confirmGiftCard}/${giftcardId}/used`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async reportGiftCard(giftcardId) {
    try {
      console.log("i tried to report");
      console.log(giftcardId);
      console.log(ENDPOINT.confirmGiftCard);
      const { data } = await axios.get(
        `${ENDPOINT.confirmGiftCard}/${giftcardId}/report`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async failGiftCard(giftcardId) {
    try {
      console.log("i tried to fail");
      console.log(giftcardId);
      console.log(ENDPOINT.confirmGiftCard);
      const { data } = await axios.get(
        `${ENDPOINT.confirmGiftCard}/${giftcardId}/fail`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async returnGiftCard(giftcardId) {
    try {
      console.log("i tried to return");
      console.log(giftcardId);
      console.log(ENDPOINT.confirmGiftCard);
      const { data } = await axios.get(
        `${ENDPOINT.confirmGiftCard}/${giftcardId}/return`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}
export default GiftCardService;
