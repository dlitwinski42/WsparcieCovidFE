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
}
export default DonationService;
