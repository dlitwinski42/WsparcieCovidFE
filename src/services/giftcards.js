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

  static async confirmGiftCard(giftcardId) {
    try {
      console.log("i tried");
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
}
export default GiftCardService;
