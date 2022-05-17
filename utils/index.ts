import express from "express";

export const sendError = function(res: express.Response, message: string) {
    return res.status(500).json({
        status: "fail",
        message: message
    });
}

export const notImplemented = function(req: express.Request, res: express.Response) {
    return res.status(200).json({
        status: "success",
        message: "Query not implemented yet"
    }); 
}