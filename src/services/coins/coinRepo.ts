/**
 * This Repo layer is responsible for storing and retrieving coin data from the database
 */
import { Coin, ICoinRepo, coinDenomination } from "../types/coinTypes";
import { CoinEvent, IntegrationEvent } from "../types/serverTypes";
import { vendorStorage } from "../../vendorMachine/storage";

export class CoinRepo implements ICoinRepo {
    private vendoreStorage;

    constructor() {
        this.vendoreStorage = vendorStorage;
    }

    async createCoin(coin: Coin): Promise<IntegrationEvent<any>> {
        try {
            this.vendoreStorage.coin.push(coin);
            return {
                type: CoinEvent.CREATE_COIN_SUCCESS,
                body: coin,
            };
        } catch (err) {
            throw new Error(err as string);
        }
    }

    async updateCoin(coin: Coin): Promise<IntegrationEvent<any>> {
        try {
            this.vendoreStorage.coin.forEach((cn) => {
                if (cn.type === coin.type) {
                    cn.quantity = coin.quantity;
                }
            });
            return {
                type: CoinEvent.UPDATE_COIN_SUCCESS,
                body: coin,
            };
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async readCoin(coinType: coinDenomination): Promise<IntegrationEvent<any>> {
        try {
            const coin = this.vendoreStorage.coin.find((coin) => coin.type === coinType);
            if (coin !== undefined && coin.quantity > 0) {
                return {
                    type: CoinEvent.READ_COIN_SUCCESS,
                    body: coin,
                };
            }
            return {
                type: CoinEvent.READ_COIN_FAILURE,
                body: coin,
            };
        } catch (error) {
            throw new Error(error as string);
        }
    }
}
