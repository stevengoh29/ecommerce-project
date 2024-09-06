import { Logger } from "@nestjs/common";
import { Response } from "express";

export interface IResponse<T> {
    data: T,
    meta?: any
}

export class ResponseUtil {
    private readonly logger = new Logger(ResponseUtil.name);

    buildResponse = (res: Response, data: any, meta?: any) => {
        let result = null;

        if (meta == undefined) {
            result = { statusCode: 200, message: "success", data: data };
        } else {
            result = { statusCode: 200, message: "success", data: data, meta };
        }

        this.logger.log(JSON.stringify(result));
        return res.status(200).json(result);
    }
}