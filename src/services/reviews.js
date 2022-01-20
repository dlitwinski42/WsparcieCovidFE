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

  static async getReported() {
    try {
      console.log("Trying to get reported reviews");
      console.log(ENDPOINT.getReportedReviews);
      const { data } = await axios.get(`${ENDPOINT.getReportedReviews}`);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async reportReview(reviewId) {
    try {
      console.log("Trying to report" + reviewId);
      console.log(ENDPOINT.reviewOperations);
      const { data } = await axios.get(
        `${ENDPOINT.reviewOperations}/${reviewId}/report`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async failReview(reviewId) {
    try {
      console.log("Trying to report" + reviewId);
      console.log(ENDPOINT.reviewOperations);
      const { data } = await axios.get(
        `${ENDPOINT.reviewOperations}/${reviewId}/fail`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async returnReview(reviewId) {
    try {
      console.log("Trying to report" + reviewId);
      console.log(ENDPOINT.reviewOperations);
      const { data } = await axios.get(
        `${ENDPOINT.reviewOperations}/${reviewId}/return`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}
export default ReviewService;
