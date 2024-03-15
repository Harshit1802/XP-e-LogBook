import { Request, Response, NextFunction } from 'express';
//import HttpException from 'utils/exceptions/http.exception'

// message constant
import HttpCode from '../constants/http-code'
import HttpMessage from '../constants/http-message'
import { verifyToken } from '../validations/token.validation';
import HttpException from '../utils/exceptions/http.exception';
import Message from '../constants/message';
import jwt from 'jsonwebtoken';
import Variable from '../constants/env/variable.env';
// http constant

class AuthenticatedMiddleware {
  public async verifyTokenAndAuthorization(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    verifyToken(req, res, () => {
      try{
        const token = req?.headers.authorization!.split(' ')[1];
        const decode = jwt.verify(token,Variable.JWT_SECRET);
        req.body.user = decode;
        return next()
      }catch(error){
        return next(
          new HttpException(
            HttpCode.FORBIDDEN,
            HttpMessage.FORBIDDEN,
            HttpMessage.NOT_ALLOWED,
          ),
        )
      }
      // if(req?.headers.authorization!.split(' ')[1]))
      // if (req?.user != undefined && (req?.user?.id === req?.params?.id || req?.user?.isAdmin)) {
      //   return next()
      // }

     
    })
  }

  public async verifyTokenAndAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    verifyToken(req, res, () => {
      return next()
      // if (req?.user != undefined && req?.user?.isAdmin) {
      //   return next()
      // }

      // return next(
      //   new HttpException(
      //     HttpCode.FORBIDDEN,
      //     HttpMessage.FORBIDDEN,
      //     Message.TOKEN_NOT_VALID,
      //   ),
      // )
    })
  }
}

export default AuthenticatedMiddleware;
