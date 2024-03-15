import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';

// variable

// message constant

// http constant


// logger
import HttpCode from '../constants/http-code';
import HttpMessage from '../constants/http-message';
import Message from '../constants/message';
import logger from '../utils/logger.utils';
import Variable from '../constants/env/variable.env';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization
  logger.info(`bearer: ${bearer}`)

  if (!bearer) {
    return next(
      new HttpException(
        HttpCode.UNAUTHORIZED,
        HttpMessage.UNAUTHORIZED,
        Message.TOKEN_NOT_VALID,
      ),
    )
  }

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(
      new HttpException(
        HttpCode.UNAUTHORIZED,
        HttpMessage.UNAUTHORIZED,
        HttpMessage.UNAUTHORIZED,
      ),
    )
  }

  const accessToken = bearer.split('Bearer ')[1].trim()

  return jwt.verify(accessToken, Variable.JWT_SECRET, (err:any, user: any) => {
    if (err) {
      res.status(HttpCode.FORBIDDEN).json({
        status: {
          code: HttpCode.FORBIDDEN,
          msg: HttpMessage.FORBIDDEN,
        },
        msg: Message.TOKEN_NOT_VALID,
      })
    }
    req.user = user
    return next();
  });
}

export default { verifyToken }
