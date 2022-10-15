import { Request, Response } from "express";
import { CoinService } from "../services/coins/coinService";
import { ProductService } from "../services/product/productService";
import { ProductEvent } from "../services/types/serverTypes";

const productService = new ProductService();

export async function buyProductController(req: Request, res: Response) {
    const { slot, amount, quantity } = req.body;
    if (slot !== undefined && quantity !== undefined && amount !== undefined) {
        const product = await productService.buyProduct({ slot, amount, quantity });
        if (product.type === ProductEvent.BUY_PRODUCT_SUCCESS) {
            res.send({ message: "Product purchased successfully!", body: product }).status(201);
        } else {
            res.send({ message: "Product purchase failed!", body: product }).status(400);
        }
    } else {
        res.send({ message: "Bad Request!" }).status(500);
    }
}

export async function setProductController(req: Request, res: Response) {
    const { slot, price } = req.body;
    if (slot !== undefined && price !== undefined) {
        const product = await productService.setPrice(slot, price);
        if (product.type === ProductEvent.SET_PRICE_SUCCESS) {
            res.send({ message: "Product price set successfully!", body: product }).status(201);
        } else {
            res.send({ message: "Product price set failed!", body: product }).status(400);
        }
    } else {
        res.send({ message: "Bad Request!" }).status(500);
    }
}

export async function setProductQtyController(req: Request, res: Response) {
    const { slot, quantity } = req.body;
    if (slot !== undefined && quantity !== undefined) {
        const updateQty = await productService.setItemQuantity(slot, quantity);
        if (updateQty.type === ProductEvent.UPDATE_PRODUCT_QTY_SUCCESS) {
            res.send({ message: "Product quantity updated successfully!", body: updateQty }).status(201);
        } else {
            res.send({ message: "Product quantity updated failed!", body: updateQty }).status(400);
        }
    } else {
        res.send({ message: "Bad Request!" }).status(500);
    }
}
