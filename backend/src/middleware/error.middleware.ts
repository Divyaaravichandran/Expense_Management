import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/HttpError";

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new HttpError(404, `Route ${req.method} ${req.originalUrl} not found`));
};

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const status = err instanceof HttpError ? err.statusCode : 500;
  const message = err instanceof HttpError ? err.message : "Internal server error";
  const details = err instanceof HttpError ? err.details : undefined;

  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  res.status(status).json({ message, details });
};
