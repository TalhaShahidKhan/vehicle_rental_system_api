// higher order function  return korbe function k

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// roles = ["admin", "user"]
const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "You have no access to this route",
        });
      }
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;
      console.log({ decoded });
      req.user = decoded;

      //["admin"]
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({
          success: false,
          statusCode: 403,
          message: "You have no access to this route",
        });
      }

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;
