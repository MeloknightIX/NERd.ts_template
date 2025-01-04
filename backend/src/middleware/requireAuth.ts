import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUser } from "../controllers/userController";
import User from "../models/UserType";

type Request_ = Request & {
  user?: User;
};

const requireAuth = async (
  req: Request_,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res
      .status(401)
      .json({ error: "authorization required: please sign in" });
  const token = authorization.split(" ")[1];

  const secret = process.env.SECRET;
  if (!secret) throw new Error("no SECRET defined in .env");

  try {
    const verifiedToken = jwt.verify(token, secret) as JwtPayload;
    const { username } = verifiedToken;

    const { user } = await getUser(username);
    if (!user) return res.status(404).json({ error: "user not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "request is not authorized" });
  }
};
export default requireAuth;
