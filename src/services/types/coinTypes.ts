import { IntegrationEvent } from "./serverTypes";

export type Coin = {
    type: Denomination;
    quantity: number;
};
export type coinDenomination = Denomination;

export enum Denomination {
    FIVE = 5,
    TEN = 10,
    TWENTYFIVE = 25,
    FIFTY = 50,
}

export interface ICoinRepo {
    createCoin(coin: Coin): Promise<IntegrationEvent<any>>;
    updateCoin(coin: Coin): Promise<IntegrationEvent<any>>;
    readCoin(coinType: coinDenomination): Promise<IntegrationEvent<any>>;
}

export interface ICoinService {
    addCoin(coin: Coin): Promise<IntegrationEvent<any>>;
    updateCoin(coin: Coin): Promise<IntegrationEvent<any>>;
}
