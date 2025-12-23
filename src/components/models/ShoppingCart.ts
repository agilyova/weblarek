import {IProduct} from "../../types";

export class ShoppingCart {
    private _products: IProduct[];

    constructor() {
        this._products = [];
    }

    get products(): IProduct[] {
        return this._products;
    }

    addProduct(product: IProduct): void {
        if (!product) {
            console.log('Выберите товар из каталога');
            throw new Error(`Продукт не задан`);
        }
        if (!product.price) {
            console.log("Товар нельзя приобрести");
            throw new Error('Продукт недоступен для продажи');
        }
        if (!this.contains(product.id)) {
            this._products.push(product);
        }
    }

    removeProduct(product: IProduct): void {
        if (product) {
            this._products = this._products
                .filter(item => item.id !== product.id);
        }
    }

    clear(): void {
        this._products = [];
    }

    getTotalPrice(): number {
        return this._products
            .reduce((acc, item) => acc + (item.price || 0), 0);
    }

    getTotalCount(): number {
        return this._products.length;
    }

    contains(id: string): boolean {
        return this._products
            .some(item => item.id === id);
    }
}