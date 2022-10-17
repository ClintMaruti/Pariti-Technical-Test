import { Express } from "express";
import { addCoinsController, updateCoinsController } from "../controller/coin.controller";
import { buyProductController, setProductController, setProductQtyController } from "../controller/product.controller";
import { validateToken, register, login, getAllMaintainers } from "../controller/maintainer.controller";
import extractJWT from "../middleware/extractJWT";

export default function (app: Express) {
    // buy product
    app.post("/api/product/buy", buyProductController);
    //===================Maintainer Routes=======================//
    // set price for product slot
    app.post("/api/product/setprice", extractJWT, setProductController);
    // adjust the number of products available for a product slot
    app.post("/api/product/setProductQty", extractJWT, setProductQtyController);
    // add coins to the vending machine
    app.post("/api/coins/addCoins", extractJWT, addCoinsController);
    // update the coins available in the machine for each type of coin
    app.post("/api/coins/updateCoins", extractJWT, updateCoinsController);
    // Testing route to validate maintainer
    app.get("/api/maintainer/validate", extractJWT, validateToken);
    // Register new maintainer
    app.post("/api/maintainer/register", register);
    // Login maintainer
    app.post("/api/maintainer/login", login);
    // Get all maintaines
    app.get("/api/maintainer/getAll", extractJWT, getAllMaintainers);
}
