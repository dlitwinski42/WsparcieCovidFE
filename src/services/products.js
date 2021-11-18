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
}
export default ProductsService;
