import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/http.exception';
import IController from '../interfaces/controller.interface';
import logger from '../utils/logger.utils';
import Api from '../constants/api';
import HttpMessage from '../constants/http-message';
import HttpCode from '../constants/http-code';
import Message from '../constants/message';
import validationMiddleware from '../middlewares/validation.middleware';
import AuthenticatedMiddleware from "../middlewares/authenticated.middleware"
import RolesValidation from '../validations/roles.validation';
import RolesService from '../services/roles.service';
import IRoles from '../interfaces/roles.interface';
import UserService from '../services/user.service';

class RolesController implements IController {
  public path: string;
  public router: Router;
  private authenticated: AuthenticatedMiddleware;
  private validate: RolesValidation;
  private rolesService: RolesService;
  private userService: UserService;
  constructor() {
    this.path = '/role';
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new RolesValidation();
    this.rolesService = new RolesService();
     this.userService=new UserService();
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${'/roles'}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.roles),
      this.createRoles,
    )
    this.router.get(
      `${this.path}${'/roles'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getRoles,
    )

    this.router.get(
      `${this.path}${'/GetrolesById/ByIds/:roleId'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getRolesByIds,
    )

    this.router.get(
      `${this.path}${'/clinicianUserRoles'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.GetClinicianUserRoles,
    )


    // this.router.get(
    //   `${this.path}${'/GetUserPermissions/ByIds/:userId'}`,
    //   this.authenticated.verifyTokenAndAuthorization,
    //   this.getRolesPermissionsByIds,
    // )
    this.router.put(
      `${this.path}${'/roles'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateRoles,
    )
    this.router.delete(
      `${this.path}${'/roles'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteRoles,
    )
  }

  private updateRoles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const roleId = req.query;
      const roles = req.body;
      const role = await this.rolesService.updateRoles(roles, roleId);
      if (!role) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating roles',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Roles updated successfully',
        data: role
      })
    } catch (err: any) {
      next(err);
    }
  }
  private GetClinicianUserRoles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const role = await this.rolesService.GetClinicianUserRoles();
      if (!role) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching roles',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Roles fetched successfully',
        data: role,
      });
    } catch (err: any) {
      next(err);
    }
  }

  
  private getRoles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const role = await this.rolesService.getRoles(params);
      if (!role) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching roles',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Roles fetched successfully',
        data: role,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private getRolesByIds = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { roleId } = req.params;
      //const arrayIds=ids.split(',');
      const role = await this.rolesService.findById(roleId);

      if (!role) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching roles',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Roles fetched successfully',
        data: role,
      });
    
    } catch (err: any) {
      next(err);
    }
  }

  // private getRolesPermissionsByIds = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<Response | void> => {
  //   try {
  //     const { userId } = req.params;
  //     //const arrayIds=ids.split(',');
  //     const user = await this.userService.findById(userId);
  //     //const GroupOfRole=[];
  //   if(user){
  //       const role = await this.rolesService.getRolesPermissionsByIds(user);

  //     if (!role) {
  //       res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
  //         status: {
  //           code: HttpCode.INTERNAL_SERVER_ERROR,
  //           msg: HttpMessage.INTERNAL_SERVER_ERROR,
  //         },
  //         msg: 'Error occured while fetching roles',
  //         data: null,
  //       });
  //     }

  //     return res.status(HttpCode.OK).json({
  //       status: {
  //         code: HttpCode.OK,
  //         msg: HttpMessage.OK,
  //       },
  //       msg: 'Roles fetched successfully',
  //       data: role,
  //     });
  //   }
  //   } catch (err: any) {
  //     next(err);
  //   }
  // }




  private createRoles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body;
      const roles = obj;
      const role: IRoles = {
        name: roles.name,
        isActive:true,
      } as IRoles

      const response = await this.rolesService.createRoles(role);
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving roles',
          data: null,
        });
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Roles created successfully',
        data: response,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private deleteRoles = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const roleId = req.query;
      const deleteRoles = await this.rolesService.deleteRoles(roleId);

      if (!deleteRoles) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting roles',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Roles deleted successfully',
        data:
          deleteRoles,
      });
    } catch (err: any) {
      next(err);
    }
  }
}
export default RolesController;
