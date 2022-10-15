import { CoinRepo } from "../coins/coinRepo";
import { coinDenomination, ICoinRepo } from "../types/coinTypes";
import { IProductRepo, IProductService, Product, ProductStruct, SlotEnum } from "../types/productTypes";
import { IntegrationEvent, ProductEvent } from "../types/serverTypes";
import { ProductRepo } from "./productRepo";

export class ProductService implements IProductService {
    private productRepo: IProductRepo;
    private coinRepo: ICoinRepo;

    constructor() {
        this.productRepo = new ProductRepo();
        this.coinRepo = new CoinRepo();
    }

    public async setPrice(slot: SlotEnum, price: coinDenomination): Promise<IntegrationEvent<Product | null>> {
        try {
            const response = await this.productRepo.setPrice(slot, price);
            if (response.type === ProductEvent.SET_PRICE_SUCCESS) {
                return {
                    type: ProductEvent.SET_PRICE_SUCCESS,
                    body: response.body,
                };
            }
            return {
                type: ProductEvent.SET_PRICE_FAILURE,
                body: response.body,
            };
        } catch (error) {
            throw new Error(error as string);
        }
    }

    public async buyProduct(data: ProductStruct): Promise<IntegrationEvent<any | null>> {
        try {
            const isProductAvailable = await this.productRepo.getProduct(data.slot);
            if (isProductAvailable.type === ProductEvent.GET_PRODUCT_SUCCESS && data.amount >= isProductAvailable.body?.price! && data.quantity <= isProductAvailable.body?.quantity!) {
                // Update the number of product quantity after purchase
                await this.productRepo.updateProductQty(data.slot, data.quantity);
                // Calculate change
                const { amount } = data;
                const productPrice = isProductAvailable.body?.price!;
                const change = amount - productPrice;
                return {
                    type: ProductEvent.BUY_PRODUCT_SUCCESS,
                    body: { ...data, change },
                };
            }
            return { type: ProductEvent.BUY_PRODUCT_FAILURE, body: null };
        } catch (error) {
            throw new Error(error as string);
        }
    }

    public async setItemQuantity(slot: SlotEnum, quantity: number): Promise<IntegrationEvent<Product | null>> {
        try {
            const isProductAvailable = await this.productRepo.getProduct(slot);
            if (isProductAvailable.type === ProductEvent.GET_PRODUCT_SUCCESS) {
                // Update the number of product quantity
                const updateQty = await this.productRepo.updateProductQty(slot, quantity);
                if (updateQty.type === ProductEvent.UPDATE_PRODUCT_QTY_SUCCESS) {
                    return {
                        type: ProductEvent.UPDATE_PRODUCT_QTY_SUCCESS,
                        body: updateQty.body,
                    };
                }
            }
            return {
                type: ProductEvent.UPDATE_PRODUCT_QTY_FAILURE,
                body: null,
            };
        } catch (error) {
            throw new Error(error as string);
        }
    }
}
