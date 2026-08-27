import httpClient from "../utils/httpClient";
import { AxiosRequestConfig } from "axios";
import { UNO_BETHEMA_API_KEY, UNO_BETHEMA_API_URL } from "../env.config";
import { IOrderPayload } from "../types/IOrderPayload";

const api = `${UNO_BETHEMA_API_URL}`;
export class OrderService {
  async processOrder(orderPayload: IOrderPayload): Promise<any> {
    try {
      const config: AxiosRequestConfig = {
        url: api + "/process-order",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-bethema-api-key": UNO_BETHEMA_API_KEY,
        },
        data: orderPayload,
      };

      const response = await httpClient.request(config);
      return response;
    } catch (error) {
      console.error("Error processing order:", error);
      throw error;
    }
  }
}
