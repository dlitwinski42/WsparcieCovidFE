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
}
export default GiftCardService;
