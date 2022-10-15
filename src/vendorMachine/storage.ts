import { ProductEnum, SlotEnum } from "../services/types/productTypes";
import IMaintainer from "../services/types/serverTypes";
import { IVendorStorage } from "./storageTypes";
import { v4 as uuidv4 } from "uuid";

export const vendorStorage: IVendorStorage = {
    "1": {
        type: ProductEnum.SODA,
        slot: SlotEnum.ONE,
        price: 0,
        quantity: 0,
    },
    "2": {
        type: ProductEnum.WAFFER,
        slot: SlotEnum.TWO,
        price: 0,
        quantity: 0,
    },
    "3": {
        type: ProductEnum.POTATO_CHIPS,
        slot: SlotEnum.THREE,
        price: 0,
        quantity: 0,
    },
    "4": {
        type: ProductEnum.CHOCOLATE_BAR,
        slot: SlotEnum.FOUR,
        price: 0,
        quantity: 0,
    },
    "5": {
        type: ProductEnum.WATER,
        slot: SlotEnum.FIVE,
        price: 0,
        quantity: 0,
    },
    coin: [],
};

export const usersStore: Array<IMaintainer> = [{ _id: uuidv4(), username: "Clint", password: "clint123" }];
