import { Router, Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';
import IController from '../interfaces/controller.interface';
import Api from '../constants/api';
import HttpException from '../utils/exceptions/http.exception';
import HttpCode from '../constants/http-code';
import HttpMessage from '../constants/http-message';
import logger from '../utils/logger.utils';
import Message from '../constants/message';
import validationMiddleware from '../middlewares/validation.middleware';
import UserValidation from '../validations/user.validation';
import RolesService from '../services/roles.service';

class AuthController implements IController {
  public path: string;
  public router: Router;
  private authService: AuthService;
  private validate: UserValidation;
  private rolesService:RolesService;
  constructor() {
    this.path = '/auth';
    this.router = Router();
    this.authService = new AuthService();
    this.validate = new UserValidation();
    this.rolesService = new RolesService();
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}${'/login'}`,
      // validationMiddleware(this.validate.login),
      this.login,
    )
  }

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { username, password } = req.body;

      if (!password || password.length < 1) {
        return res.status(HttpCode.BAD_REQUEST).send({
          status: {
            code: HttpCode.BAD_REQUEST,
            msg: HttpMessage.BAD_REQUEST,
          },
          msg: ['Invalid Password'],
        });
      }

      const user = await this.authService.findByEmailWithPassword(username);
      if (!user) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).send({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg:HttpMessage.INTERNAL_SERVER_ERROR
          },
          msg: ['User Not Found'],
        });
      }

      // const isMatch = this.authService.comparePassword(password, user.password)
      // if (!isMatch) {
      //   return res.status(HttpCode.INTERNAL_SERVER_ERROR).send({
      //     status: {
      //       code: HttpCode.INTERNAL_SERVER_ERROR,
      //       msg:HttpMessage.INTERNAL_SERVER_ERROR
      //     },
      //     msg: ['Incorrect Password.'],
      //   });
      // }

      const accessToken = await this.authService.generateAccessToken(
        user.id,
        user.isAdmin,
      );
      const newUser = { ...user }._doc;

      const permission= await this.rolesService.getRolesPermissionsByIds(newUser);
if(permission){
  if (!newUser.permissions) {
    newUser.permissions = []; // Initialize permissions array if it doesn't exist
  }
      newUser.permissions.push(permission);
}
      delete newUser.password;

      newUser.accessToken = accessToken;
      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: Message.USER_LOGIN_SUCCESS,
        data: newUser,
      });
    } catch (error: any) {
      next(error);
      // return res.status(HttpCode.INTERNAL_SERVER_ERROR).send({
      //   status: {
      //     code: HttpCode.INTERNAL_SERVER_ERROR,
      //     msg: HttpMessage.INTERNAL_SERVER_ERROR,
      //   },
      //   msg: 'Something went wrong. Please try again.',
      // });

    }
  }
}

export default AuthController;
