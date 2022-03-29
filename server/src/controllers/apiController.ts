import { Request, Response } from "express";

export const connect = (req: Request, res: Response) => {
    return res.send({message: "Connect Success"});
}