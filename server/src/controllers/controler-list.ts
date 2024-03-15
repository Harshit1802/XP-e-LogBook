import IController from "../interfaces/controller.interface";
import AuthController from "./auth.controller";
import CommonController from "./common.controller";
import PermissionsController from "./permissions.controller";
import RolesController from "./roles.controller";
import UserController from "./user.controller";


class Controllers {
    public static list: IController[] = [
        new UserController(),
        new AuthController(),
        new RolesController(),  
        new CommonController(),
        new PermissionsController()
    ]

}

export default Controllers