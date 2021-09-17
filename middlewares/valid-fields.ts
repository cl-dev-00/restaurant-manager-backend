import { Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator"

validationResult

const validFields = (req: Request, res: Response, next: Function):any => {

    const error: Result<ValidationError> = validationResult(req);

    if(!error.isEmpty()) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            error
        });
    }

    next();

}

export default validFields;