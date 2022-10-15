import request from "supertest";
import { Coin } from "../../../src/services/types/coinTypes";
import app from "../../../src/app";

let token: string = "";

describe("Test Maintenance routes", () => {
    test("sending request to '/api/coins/addCoins' adds coins to vending machine", async () => {
        const tenUSDCoin: Coin = {
            type: 10,
            quantity: 100,
        };
        const res = await request(app).post(`/api/coins/addCoins`).send(tenUSDCoin);
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(200);
        expect(res.body.body).toMatchObject({
            type: 10,
            quantity: 100,
        });
    });
    test("sending request to '/api/coins/updateCoins' updates existing coins", async () => {
        const tenUSDCoin: Coin = {
            type: 10,
            quantity: 100,
        };
        const updatedtenUSDCoin: Coin = {
            type: 10,
            quantity: 20,
        };
        await request(app).post(`/api/coins/addCoins`).send(tenUSDCoin);
        const res = await request(app).post(`/api/coins/updateCoins`).send(updatedtenUSDCoin);
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(200);
        expect(res.body.body).toMatchObject({
            type: 10,
            quantity: 20,
        });
    });
});

describe("Tesing user routes", () => {
    test("sending request to '/api/product/setProductQty' sets product quantity", async () => {
        const res = await request(app).post(`/api/product/setProductQty`).send({ slot: "1", quantity: 100 });
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(200);
        expect(res.body.body.type).toBe("UPDATE_PRODUCT_SUCCESS");
        expect(res.body.body.body).toMatchObject({ type: "SODA", slot: "1", price: 0, quantity: 100 });
    });

    test("sending request to '/api/product/setprice' sets product price", async () => {
        const res = await request(app).post(`/api/product/setprice`).send({ slot: "1", price: 100 });
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(200);
        expect(res.body.body.type).toBe("SET_PRICE_SUCCESS");
        expect(res.body.body.body).toMatchObject({ type: "SODA", slot: "1", price: 100, quantity: 100 });
    });

    test("sending request to '/api/product/buy' purchases a product and returns change", async () => {
        const res = await request(app).post(`/api/product/buy`).send({ slot: "1", amount: 200, quantity: 1 });
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(200);
        expect(res.body.body.type).toBe("BUY_PRODUCT_SUCCESS");
        expect(res.body.body.body).toMatchObject({ slot: "1", amount: 200, quantity: 1, change: 100 });
    });
});

describe("Testing maintainer signup login routes", () => {
    test("registers new maintainer success", async () => {
        const res = await request(app).post(`/api/maintainer/register`).send({ username: "pariti", password: "pariti123" });
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(201);
        expect(res.body.body.username).toBe("pariti");
    });
    test("a resitered user is able to signin successfully", async () => {
        const res = await request(app).post(`/api/maintainer/login`).send({ username: "pariti", password: "pariti123" });
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(201);
    });
});
