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
import UserService from '../services/user.service';
import CommonService from '../services/common.service';
import IPlant from '../interfaces/plant.interface';

class CommonController implements IController {
  public path: string;
  public router: Router;
  private authenticated: AuthenticatedMiddleware;
  //private validate: plantsValidation;
  private commonService: CommonService;
  private userService: UserService;
  constructor() {
    this.path = '/common';
    this.router = Router();
    this.authenticated = new AuthenticatedMiddleware();
    //this.validate = new plantsValidation();
    this.commonService = new CommonService();
     this.userService=new UserService();
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}${'/plants'}`,
      this.authenticated.verifyTokenAndAuthorization,
      //validationMiddleware(this.validate.plants),
      this.createplants,
    )
    this.router.get(
      `${this.path}${'/plants'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getplants,
    )

    this.router.get(
      `${this.path}${'/GetplantsById/ByIds/:plantId'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.getplantsByIds,
    )
    this.router.put(
      `${this.path}${'/plants'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.updateplants,
    )
    this.router.delete(
      `${this.path}${'/plants'}`,
      this.authenticated.verifyTokenAndAuthorization,
      this.deleteplants,
    )
  }

  private updateplants = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const plantId = req.query;
      const plants = req.body;
      const plant = await this.commonService.updateplant(plants, plantId);
      if (!plant) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while updating plants',
          data: null,
        })
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'plants updated successfully',
        data: plant
      })
    } catch (err: any) {
      next(err);
    }
  }
  
  private getplants = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const params = req.query;
      const plant = await this.commonService.getplant();
     
      if (!plant) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching plants',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'plants fetched successfully',
        data: plant,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private getplantsByIds = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { plantId } = req.params;
      //const arrayIds=ids.split(',');
      const plant = await this.commonService.findByPlantId(plantId);

      if (!plant) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while fetching plants',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'plants fetched successfully',
        data: plant,
      });
    
    } catch (err: any) {
      next(err);
    }
  }
  private createplants = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const obj = req.body;
      const plants = obj;
      const plant: IPlant = {
        name: plants.name,
        isActive:true,
        location:plants.location,
        description:plants.description
      } as IPlant

      const response = await this.commonService.createplant(plant);
      if (!response) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while saving plants',
          data: null,
        });
      }

      return res.status(HttpCode.CREATED).json({
        status: {
          code: HttpCode.CREATED,
          msg: HttpMessage.CREATED,
        },
        msg: 'plants created successfully',
        data: response,
      });
    } catch (err: any) {
      next(err);
    }
  }

  private deleteplants = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const plantId = req.query;
      const deleteplants = await this.commonService.deleteplant(plantId);

      if (!deleteplants) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          status: {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            msg: HttpMessage.INTERNAL_SERVER_ERROR,
          },
          msg: 'Error occured while deleting plants',
          data: null,
        });
      }

      return res.status(HttpCode.OK).json({
        status: {
          code: HttpCode.OK,
          msg: HttpMessage.OK,
        },
        msg: 'plants deleted successfully',
        data:
          deleteplants,
      });
    } catch (err: any) {
      next(err);
    }
  }
}
export default CommonController;
