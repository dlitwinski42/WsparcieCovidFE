import axios from "axios";
import { ENDPOINT } from "./../strings";

class EntrepreneurService {
  static async getEntrepreneur() {
    try {
      console.log(ENDPOINT.entrepreneurList);
      const { data } = await axios.get(ENDPOINT.entrepreneurList);
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default EntrepreneurService;
