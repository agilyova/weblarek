export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'online' | 'offline' | undefined; //(способ оплаты может принимать значения “card” или “cash”);

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface ICustomer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export interface IOrder extends ICustomer {
    total: number;
    items: string[];
}

export interface IOrderResponse {
    id: string;
    total: number;
}