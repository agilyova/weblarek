import {IProduct} from "../../types";

export class ProductCatalog {

    private _products: IProduct[];
    private _selectedProduct: IProduct | undefined;

    constructor(products: IProduct[]) {
        this._products = products;
        this._selectedProduct = undefined;
    }

    get products(): readonly IProduct[]{
        return this._products;
    }

    set products(products: IProduct[]): void {
        this._products = products;
    }

    get selectedProduct(): IProduct | undefined {
        return this._selectedProduct;
    }

    set selectedProduct(product: IProduct | undefined) {
        this._selectedProduct = product;
    }

    getProduct(id: string): IProduct | undefined {
        return this._products.find(item => item.id === id);
    }
}