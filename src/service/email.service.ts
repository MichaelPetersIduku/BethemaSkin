import httpClient from "../utils/httpClient";
import { AxiosRequestConfig } from "axios";
import { BREVO_BASE_URL } from "../env.config";

const api = `${BREVO_BASE_URL}`;
export class EmailService {
  async sendCustomerOrderEmail(articleData: any) {
    try {
      const config: any = {
        url: api,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: articleData,
      };

      const response = await httpClient.request(config);
      return response;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  }
}
