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

  static async getDelivered(entrepreneurId) {
    try {
      console.log("Trying Delivered Orders");
      console.log(entrepreneurId);
      console.log(ENDPOINT.getDeliveredOrders);
      const { data } = await axios.get(
        `${ENDPOINT.getDeliveredOrders}/${entrepreneurId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getHistory(contributorId) {
    try {
      console.log("Trying Order History");
      console.log(contributorId);
      console.log(ENDPOINT.getActiveOrders);
      const { data } = await axios.get(
        `${ENDPOINT.getActiveOrders}/${contributorId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getOrder(orderId) {
    try {
      console.log("i tried");
      console.log(orderId);
      console.log(ENDPOINT.getActiveOrders);
      const { data } = await axios.get(
        `${ENDPOINT.getActiveOrders}/${orderId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getOrderInfo(orderId) {
    try {
      console.log("i tried");
      console.log(orderId);
      console.log(ENDPOINT.getOrderInfo);
      const { data } = await axios.get(`${ENDPOINT.getOrderInfo}/${orderId}`);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async confirmOrder(orderId) {
    try {
      console.log("i tried");
      console.log(orderId);
      console.log(ENDPOINT.confirmOrder);
      console.log();
      const { data } = await axios.get(
        `${ENDPOINT.confirmOrder}/${orderId}/received`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async failOrder(orderId) {
    try {
      console.log("i tried");
      console.log(orderId);
      console.log(ENDPOINT.confirmOrder);
      console.log();
      const { data } = await axios.get(
        `${ENDPOINT.confirmOrder}/${orderId}/failed`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}
export default OrdersService;
