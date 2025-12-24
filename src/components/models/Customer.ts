import {ICustomer, TPayment, TValidationErrors} from "../../types";
import {validationMessages} from '../../utils/constants';

export class Customer {
    private customer: ICustomer;

    constructor() {
        this.customer = {
            payment: undefined,
            address: '',
            phone: '',
            email: ''
        }
    }

    setPayment(type: TPayment) {
        this.customer.payment = type;
        return this;
    }

    setAddress(address: string) {
        this.customer.address = address;
        return this;
    }

    setPhone(phone: string) {
        this.customer.phone = phone;
        return this;
    }

    setEmail(email: string) {
        this.customer.email = email;
        return this;
    }

    getCustomer(): ICustomer {
        return this.customer;
    }

    clear() {
        this.customer.payment = undefined;
        this.customer.address = '';
        this.customer.phone = '';
        this.customer.email = '';
    }

    validate(): TValidationErrors {
        const errors: TValidationErrors = {};
        for (const key in this.customer) {
            if (!this.customer[key as keyof ICustomer]) {
                errors[key] = validationMessages[key];
            }
        }
        return errors;
    }
}