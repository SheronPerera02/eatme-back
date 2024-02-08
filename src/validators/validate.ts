import Ajv, { Schema } from "ajv";
import { NextFunction, Request, Response } from "express";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";
import { StatusCodes } from "http-status-codes";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
ajvErrors(ajv);

const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = ajv.compile(schema);
    const isValid = validate(req.body);
    if (!isValid) {
      const splitInstancePath = validate.errors![0].instancePath.split("/");
      const err = {
        status: StatusCodes.BAD_REQUEST,
        message: `${splitInstancePath[splitInstancePath.length - 1]} ${
          validate.errors![0].message
        }`.trim(),
      };
      return next(err);
    }
    next();
  };
};

export default validateRequest;
