import { Request, Response } from "express";

export const uploadProduct = (req: Request, res: Response) => {
  return res.send({ message: "상품이 업로드 되었습니다." });
};

export const getProductList = (req: Request, res: Response) => {
  return res.send({ message: "조회된 상품이 없습니다." });
};
