import HttpCode from '../constants/http-code'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import Joi from 'joi'

// http constant

const validationMiddleware = (schema: Joi.Schema): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: false,
    }

    try {
      const value = await schema.validateAsync(req.body, validationOptions)
      req.body = value
      next()
    } catch (e: any) {
      const errors: string[] = []
      e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message)
      });
      next(e);
      // res.status(HttpCode.BAD_REQUEST).send({
      //   status: {
      //     code: HttpCode.BAD_REQUEST,
      //     msg: HttpCode.BAD_REQUEST,
      //   },
      //   msg: errors,
      // })
      
    }
  }
}

export default validationMiddleware;
