/**
 * This product repo layer is responsible for storing, updating and retrieving products from database.
 */
import { IProductRepo, Product, SlotEnum } from "../types/productTypes";
import { vendorStorage } from "../../vendorMachine/storage";
import { IntegrationEvent, ProductEvent } from "../types/serverTypes";
import { coinDenomination } from "../types/coinTypes";

export class ProductRepo implements IProductRepo {
    private vendoreStorage;

    constructor() {
        this.vendoreStorage = vendorStorage;
    }

    public async setPrice(slot: SlotEnum, price: coinDenomination): Promise<IntegrationEvent<Product | null>> {
        try {
            this.vendoreStorage[slot].price = price;
            return {
                type: ProductEvent.SET_PRICE_SUCCESS,
                body: this.vendoreStorage[slot],
            };
        } catch (error) {
            throw new Error(error as string);
        }
    }

    public async setItemQuantity(slot: SlotEnum, quantity: number): Promise<IntegrationEvent<any>> {
        try {
            const product = (this.vendoreStorage[slot].quantity = quantity);
            return {
                type: ProductEvent.SET_PRODUCT_QUANTITY_SUCCESS,
                body: product,
            };
        } catch (error) {
            throw new Error(error as string);
        }
    }

    public async getProduct(slot: SlotEnum): Promise<IntegrationEvent<Product | null>> {
        try {
            const product = this.vendoreStorage[slot];
            if (product !== undefined) {
                return {
                    type: ProductEvent.GET_PRODUCT_SUCCESS,
                    body: product,
                };
            }
            return {
                type: ProductEvent.GET_PRODUCT_FAILURE,
                body: null,
            };
        } catch (error) {
            throw new Error(error as string);
        }
    }

    public async updateProductQty(slot: SlotEnum, quantity: number): Promise<IntegrationEvent<Product | null>> {
        try {
            // get product to delete
            const product = await this.getProduct(slot);
            // if product is available, remove it from object
            if (product.type === ProductEvent.GET_PRODUCT_SUCCESS) {
                this.vendoreStorage[slot].quantity = quantity;
                return {
                    type: ProductEvent.UPDATE_PRODUCT_QTY_SUCCESS,
                    body: this.vendoreStorage[slot],
                };
            }
            return { type: ProductEvent.UPDATE_PRODUCT_QTY_FAILURE, body: null };
        } catch (error) {
            throw new Error(error as string);
        }
    }
}
