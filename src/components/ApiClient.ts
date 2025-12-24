import {IApi, IOrder, IOrderResponse, IProductsResponse} from "../types";
import {API_ENDPOINTS} from "../utils/constants.ts";

export class ApiClient {

    private api;

    constructor(api: IApi) {
        this.api = api
    }

    async getProducts():Promise<IProductsResponse> {
        return await this.api.get<IProductsResponse>(API_ENDPOINTS.PRODUCTS)
    }

    async createOrder(order: IOrder): Promise<IOrderResponse> {
        return await this.api.post<IOrderResponse>(API_ENDPOINTS.ORDER, order);
    }
}