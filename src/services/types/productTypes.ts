import { coinDenomination } from "./coinTypes";
import { IntegrationEvent } from "./serverTypes";

export type Product = {
    type: ProductEnum;
    slot: SlotEnum;
    price: coinDenomination;
    quantity: number;
};

export enum ProductEnum {
    SODA = "SODA",
    WAFFER = "WAFFER",
    POTATO_CHIPS = "POTATO_CHIPS",
    CHOCOLATE_BAR = "CHOCOLATE_BAR",
    WATER = "WATER",
}

export enum SlotEnum {
    ONE = "1",
    TWO = "2",
    THREE = "3",
    FOUR = "4",
    FIVE = "5",
}

export type ProductStruct = {
    slot: SlotEnum;
    amount: number;
    quantity: number;
};

export interface IProductRepo {
    setPrice(slot: SlotEnum, price: coinDenomination): Promise<IntegrationEvent<Product | null>>;
    getProduct(slot: SlotEnum): Promise<IntegrationEvent<Product | null>>;
    setItemQuantity(slot: SlotEnum, quantity: number): Promise<IntegrationEvent<any>>;
    updateProductQty(slot: SlotEnum, quantity: number): Promise<IntegrationEvent<Product | null>>;
}

export interface IProductService {
    setPrice(slot: SlotEnum, price: coinDenomination): Promise<IntegrationEvent<Product | null>>;
    setItemQuantity(slot: SlotEnum, quantity: number): Promise<IntegrationEvent<Product | null>>;
    buyProduct(data: ProductStruct): Promise<IntegrationEvent<any>>;
}
