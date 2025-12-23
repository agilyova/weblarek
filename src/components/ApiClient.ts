import {IApi, IOrder, IOrderResponse, IProduct} from "../types";
import {API_ENDPOINTS} from "../utils/constants.ts";

export class ApiClient {

    private api;

    constructor(api: IApi) {
        this.api = api
    }

    async getProducts():Promise<IProduct[]> {
        try {
            return await this.api.get(API_ENDPOINTS.PRODUCTS)
        } catch (err) {
            console.log(err);
        }
    }

    async createOrder(order: IOrder): Promise<IOrderResponse> {
        try {
            return await this.api.post(API_ENDPOINTS.ORDER, order)
        } catch (err) {
            console.log(err);
        }
    }
}