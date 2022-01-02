import axios from "axios";
import { ENDPOINT, REQUEST_STATUS } from "./../strings";

class ReviewService {
  static async create(formValues) {
    try {
      console.log("Trying to create a Review");
      console.log(formValues);
      console.log(ENDPOINT.createReview);
      const { data } = await axios.post(ENDPOINT.createReview, formValues);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getReviews(entrepreneurId) {
    try {
      console.log("Trying to get reviews for" + entrepreneurId);
      console.log(ENDPOINT.getReviews);
      const { data } = await axios.get(
        `${ENDPOINT.getReviews}/${entrepreneurId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}
export default ReviewService;
