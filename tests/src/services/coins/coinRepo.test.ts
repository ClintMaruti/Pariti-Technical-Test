import { CoinRepo } from "../../../../src/services/coins/coinRepo";
import { Coin } from "../../../../src/services/types/coinTypes";
import { CoinEvent } from "../../../../src/services/types/serverTypes";
import { vendorStorage } from "../../../../src/vendorMachine/storage";
import { IVendorStorage } from "../../../../src/vendorMachine/storageTypes";

describe("Testing CoinRepo Class", () => {
    let coinRepoInstance: CoinRepo;
    let vendorMachine: IVendorStorage;

    beforeEach(() => {
        coinRepoInstance = new CoinRepo();
        vendorMachine = vendorStorage;
    });

    afterEach(() => {
        vendorMachine.coin = [];
    });

    it("should be instance of CoinRepo", async () => {
        expect(coinRepoInstance).toBeInstanceOf(CoinRepo);
    });

    it("should create a Five Dollar Coin in the vendor machine when provided with correct parameters", async () => {
        const fiveUsd: Coin = {
            type: 5,
            quantity: 100,
        };
        const createdCoins = await coinRepoInstance.createCoin(fiveUsd);
        expect(createdCoins.type).toBe(CoinEvent.CREATE_COIN_SUCCESS);
        expect(vendorStorage.coin).toEqual(expect.arrayContaining([expect.objectContaining({ type: 5, quantity: 100 })]));
    });

    it("should update a created coin quantity in the vendor machine", async () => {
        const tenUsd: Coin = {
            type: 10,
            quantity: 100,
        };
        const updateTenUsdCoin: Coin = {
            type: 10,
            quantity: 50,
        };
        await coinRepoInstance.createCoin(tenUsd);
        const updatedCoin = await coinRepoInstance.updateCoin(updateTenUsdCoin);
        expect(updatedCoin.type).toBe(CoinEvent.UPDATE_COIN_SUCCESS);
        expect(vendorStorage.coin).toEqual(expect.arrayContaining([expect.objectContaining({ type: 10, quantity: 50 })]));
    });

    it("should return a coin passed as parameter which is available coin the vendor machine", async () => {
        const twentyFiveUsd: Coin = {
            type: 25,
            quantity: 100,
        };
        await coinRepoInstance.createCoin(twentyFiveUsd);
        const getTwentyFiveUSDCoin = await coinRepoInstance.readCoin(25);
        expect(getTwentyFiveUSDCoin.type).toBe(CoinEvent.READ_COIN_SUCCESS);
        expect(getTwentyFiveUSDCoin.body).toMatchObject({
            type: 25,
            quantity: 100,
        });
    });
});
