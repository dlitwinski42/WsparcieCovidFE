import axios from "axios";
import { ENDPOINT, REQUEST_STATUS } from "./../strings";

class ProductsService {
  static async create(formValues) {
    try {
      console.log("i tried");
      console.log(formValues);
      console.log(ENDPOINT.createProduct);
      const { data } = await axios.post(ENDPOINT.createProduct, formValues);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getProducts(entrepreneurId) {
    try {
      console.log("i tried");
      console.log(entrepreneurId);
      console.log(ENDPOINT.getProducts);
      const { data } = await axios.get(
        ENDPOINT.getProducts + "/" + entrepreneurId
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async addProduct(formValues) {
    try {
      console.log("i tried");
      console.log(formValues);
      console.log(ENDPOINT.addProduct);
      const { data } = await axios.post(ENDPOINT.addProduct, formValues);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}
export default ProductsService;
