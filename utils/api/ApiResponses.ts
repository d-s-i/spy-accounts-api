import express from "express";

export class ApiResponses {

    private _res: express.Response;
    
    constructor(res: express.Response) {
        this._res = res;
    }

    sendGetSuccessful(_data: object) {
        this._res.status(200).json({
            status: "success",
            data: _data
        });
    }
    
    sendCreationSuccessful(_data: object) {
        this._res.status(200).json({
            status: "success",
            data: _data
        });
    }

    sendUpdateSuccessful(_data: object) {
        this._res.status(200).json({
            status: "success",
            data: _data
        });
    }

    sendDeleteSuccessfull() {
        this._res.status(204).json({
            status: "success",
            data: null
        });
    }
    
    sendError(message: unknown) {
        this._res.status(500).json({
            status: "fail",
            message: message
        });
    }

    sendAlreadyQueriedResponse() {
        this._res.status(208).json({
            status: "already-queried",
            message: "Document already present in the database at this date"
        });
    }

    sendNotImplemented() {
        this._res.status(200).json({
            status: "success",
            message: "Query not implemented yet"
        }); 
    }
}