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
import PermissionsValidation from '../validations/permissions.validation';
import PermissionsService from '../services/permission.service';
import IPermissions from '../interfaces/permissions.interface';

class PermissionsController implements IController {
  public path: string;
  public router: Router;
  private authenticated: AuthenticatedMiddleware;
  private validate: PermissionsValidation;
  private permissionsService: PermissionsService;

  constructor() {
    this.path = '/permission';
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    this.validate = new PermissionsValidation();
    this.permissionsService = new PermissionsService();

    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${'/permissions'}`,
      this.authenticated.verifyTokenAndAuthorization,
      validationMiddleware(this.validate.permissions),
      this.createPermissions,
    )
    this.router.get(
      `${this.path}${'/permissions'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getPermissions,
    )
    this.router.get(
      `${this.path}${'/allPermissions'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getAllPermissions,
    )
    this.router.put(
      `${this.path}${'/permissions'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updatePermissions,
    )
    this.router.delete(
      `${this.path}${'/permissions'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deletePermissions,
    )
  }

  private updatePermissions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const permissionId = req.query;
      const permissions = req.body;
      const permission = await this.permissionsService.updatePermissions(permissions, permissionId);
      if (!permission) {
       return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating permission',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Permission updated successfully',
        data: permission
      });
    } catch (err: any) {
      next(err);
    }
  }

  private getPermissions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const permission = await this.permissionsService.getPermissions(params);
      if (!permission) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching permission',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Permission fetched successfully',
        data: permission,
      });
    } catch (err: any) {
      next(err);
    }
  }
  
  private getAllPermissions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const permission = await this.permissionsService.getPermissions(params);
      if (!permission) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching permission',
          data: null,
        })
      }
      const groupedPermissions: Record<string, { permissions: { name: string; id: number; isSelected:boolean }[] }> = {};

      // Group permissions by module
      permission.forEach(permission => {
        const { moduleName, permissionName, _id } = permission;
      
        if (!groupedPermissions[moduleName]) {
          groupedPermissions[moduleName] = { permissions: [] };
        }
      
        groupedPermissions[moduleName].permissions.push({ name: permissionName, id: _id,isSelected:false });
      });
      
      // Convert groupedPermissions to the desired format
      const result = Object.keys(groupedPermissions).map(module => ({
        module,
        permissions: groupedPermissions[module].permissions,
      }));
      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Permission fetched successfully',
        data: result,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private createPermissions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body;
      const permissions = obj;
      const permission: IPermissions = {
        permissionName: permissions.permissionName,
        moduleName: permissions.moduleName,
      } as IPermissions

      const response = await this.permissionsService.createPermissions(permission);
      if (!response) {
        return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving permission',
          data: null,
        });
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'Permission created successfully',
        data: response,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private deletePermissions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const permissionId = req.query;
      const deletePermissions = await this.permissionsService.deletePermissions(permissionId);

      if (!deletePermissions) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting permission',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'Permission deleted successfully',
        data: deletePermissions,
      });
    } catch (err: any) {
      next(err);
    }
  }
}
export default PermissionsController;