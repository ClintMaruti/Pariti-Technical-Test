import { Coin } from "../services/types/coinTypes";
import { Product } from "../services/types/productTypes";

export interface IVendorStorage {
    "1": Product;
    "2": Product;
    "3": Product;
    "4": Product;
    "5": Product;
    coin: Array<Coin>;
}
