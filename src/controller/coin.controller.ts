import { Request, Response } from "express";
import { CoinService } from "../services/coins/coinService";
import { CoinEvent } from "../services/types/serverTypes";

const coinService = new CoinService();

export async function updateCoinsController(req: Request, res: Response) {
    const { type, quantity } = req.body;
    if (type !== undefined && quantity !== undefined) {
        const updateQty = await coinService.updateCoin({ type, quantity });
        if (updateQty.type === CoinEvent.UPDATE_COIN_SUCCESS) {
            res.send({ message: "Updated coin successfully!", body: updateQty.body }).status(201);
        } else {
            res.send({ message: "Updated coin failed!" }).status(400);
        }
    } else {
        res.send({ message: "Bad Request!" }).status(500);
    }
}

export async function addCoinsController(req: Request, res: Response) {
    const { type, quantity } = req.body;
    if (type !== undefined && quantity !== undefined) {
        const addCoin = await coinService.addCoin({ type, quantity });
        if (addCoin.type === CoinEvent.ADD_COIN_SUCCESS) {
            res.send({ message: "Added coins successfully!", body: addCoin.body });
        } else {
            res.send({ message: "Add coins failed!" }).status(400);
        }
    } else {
        res.send({ message: "Bad Request!" }).status(500);
    }
}
