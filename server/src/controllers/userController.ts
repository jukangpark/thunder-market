import { Express, Request, Response } from "express"

export const join = (req: Request, res: Response) => {
    return res.send({message: "조인성공"}).end();
}

export const getJoin = (req: Request, res: Response) => {
    return res.send({ message: "아무거나"}).end();
}