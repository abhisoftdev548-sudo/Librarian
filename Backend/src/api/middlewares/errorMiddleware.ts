import type { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if(err.code === 11000){
        err.statusCode = 400;
        err.message = `Duplicate field value entered for ${Object.keys(err.keyValue)} field, please choose another value.`;
    }

    if(err.name === "TokenExpiredError"){
        err.statusCode = 401;
        err.message = "Your session has expired, please login again.";
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}