import axios from "axios";
import { ENDPOINT, REQUEST_STATUS } from "./../strings";

class DonationService {
  static async create(formValues) {
    try {
      console.log("i tried");
      console.log(formValues);
      console.log(ENDPOINT.createDonation);
      const { data } = await axios.post(ENDPOINT.createDonation, formValues);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getDonations(entrepreneurId) {
    try {
      console.log("i tried");
      console.log(entrepreneurId);
      console.log(ENDPOINT.getActiveDonations);
      const { data } = await axios.get(
        `${ENDPOINT.getActiveDonations}/${entrepreneurId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async confirmDonation(donationId) {
    try {
      console.log("i tried");
      console.log(donationId);
      console.log(ENDPOINT.confirmDonation);
      const { data } = await axios.get(
        `${ENDPOINT.confirmDonation}/${donationId}/confirm`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getConfirmed(entrepreneurId) {
    try {
      console.log("Trying confirmed donations");
      console.log(entrepreneurId);
      console.log(ENDPOINT.getConfirmedDonations);
      const { data } = await axios.get(
        `${ENDPOINT.getConfirmedDonations}/${entrepreneurId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getHistory(contributorId) {
    try {
      console.log("Trying donation history");
      console.log(contributorId);
      console.log(ENDPOINT.getHistoryDonations);
      const { data } = await axios.get(
        `${ENDPOINT.getHistoryDonations}/${contributorId}`
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}
export default DonationService;
