import axios from "axios";
import { ENDPOINT } from "./../strings";

class ContributorsService {
  static async getContributor(contributorId) {
    try {
      console.log(ENDPOINT.getContributor);
      const { data } = await axios.get(
        `${ENDPOINT.getContributor}/${contributorId}`
      );
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default ContributorsService;
