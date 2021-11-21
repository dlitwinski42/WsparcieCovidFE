import axios from "axios";
import { ENDPOINT, REQUEST_STATUS } from "./../strings";

class OrdersService {
  static async create(formValues) {
    try {
      console.log("i tried");
      console.log(formValues);
      console.log(ENDPOINT.createOrder);
      const { data } = await axios.post(ENDPOINT.createOrder, formValues);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getActive(entrepreneurId) {
    try {
      console.log("i tried");
      console.log(entrepreneurId);
      console.log(ENDPOINT.getActiveOrders);
      const { data } = await axios.get(
        `${ENDPOINT.getActiveOrders}/${entrepreneurId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}
export default OrdersService;
