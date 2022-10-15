import { ICoinService, ICoinRepo, Coin } from "../types/coinTypes";
import { IntegrationEvent, CoinEvent } from "../types/serverTypes";
import { CoinRepo } from "./coinRepo";

export class CoinService implements ICoinService {
    private coinRepo: ICoinRepo;

    constructor() {
        this.coinRepo = new CoinRepo();
    }

    public async addCoin(coin: Coin): Promise<IntegrationEvent<any | null>> {
        try {
            const response = await this.coinRepo.createCoin(coin);
            if (response.type === CoinEvent.CREATE_COIN_SUCCESS) {
                return {
                    type: CoinEvent.ADD_COIN_SUCCESS,
                    body: coin,
                };
            }
            return { type: CoinEvent.ADD_COIN_FAILURE, body: null };
        } catch (error) {
            throw new Error(error as string);
        }
    }

    public async updateCoin(coin: Coin): Promise<IntegrationEvent<any>> {
        try {
            // check if coin is available
            const isCoinAvailable = await this.coinRepo.readCoin(coin.type);
            if (isCoinAvailable.type === CoinEvent.READ_COIN_SUCCESS) {
                await this.coinRepo.updateCoin(coin);
                return {
                    type: CoinEvent.UPDATE_COIN_SUCCESS,
                    body: coin,
                };
            }
            return { type: CoinEvent.UPDATE_COIN_FAILURE, body: null };
        } catch (error) {
            throw new Error(error as string);
        }
    }
}
