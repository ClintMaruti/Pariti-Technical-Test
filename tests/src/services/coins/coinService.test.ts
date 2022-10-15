import { CoinService } from "../../../../src/services/coins/coinService";
import { CoinEvent } from "../../../../src/services/types/serverTypes";
import { Coin } from "../../../../src/services/types/coinTypes";
import { vendorStorage } from "../../../../src/vendorMachine/storage";
import { IVendorStorage } from "../../../../src/vendorMachine/storageTypes";

describe("Test CoinService Class", () => {
    let coinServiceInstance: CoinService;
    let vendorMachine: IVendorStorage;

    beforeEach(() => {
        coinServiceInstance = new CoinService();
        vendorMachine = vendorStorage;
    });

    it("should be instance of CoinService", async () => {
        expect(coinServiceInstance).toBeInstanceOf(CoinService);
    });

    it("should add coin to vendorMachine", async () => {
        const fiveUsd: Coin = {
            type: 5,
            quantity: 100,
        };
        const createdCoins = await coinServiceInstance.addCoin(fiveUsd);
        expect(createdCoins.type).toBe(CoinEvent.ADD_COIN_SUCCESS);
    });

    it("should update coin quantity", async () => {
        const tenUsd: Coin = {
            type: 10,
            quantity: 100,
        };
        const updateTenUsdCoin: Coin = {
            type: 10,
            quantity: 50,
        };
        await coinServiceInstance.addCoin(tenUsd);
        const updatedCoin = await coinServiceInstance.updateCoin(updateTenUsdCoin);
        expect(updatedCoin.type).toBe(CoinEvent.UPDATE_COIN_SUCCESS);
        expect(vendorMachine.coin).toEqual(expect.arrayContaining([expect.objectContaining({ type: 10, quantity: 50 })]));
    });
});
