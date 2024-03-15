import IRoles from "../interfaces/roles.interface";
import IUser from "../interfaces/user.interface";
import RolesRepository from "../repositories/roles.repository";

class RolesService {
    private rolesRepository: RolesRepository;

    constructor() {
        this.rolesRepository = new RolesRepository();
    }

    public async getRoles(params?) {
        const getRoles = await this.rolesRepository.getRoles(params);
        return getRoles;
    }

    public async GetClinicianUserRoles() {
        const getRoles = await this.rolesRepository.GetClinicianUserRoles();
        return getRoles;
    }
    public async getRolesPermissionsByIds(user:IUser) {
        const getRoles = await this.rolesRepository.getRolesPermissionsByIds(user);
        return getRoles;
   }
    public async createRoles(roles: IRoles): Promise<any> {
        const savedRoles = await this.rolesRepository.createRoles(roles);
        return savedRoles;
    }
    public async findById(id: any): Promise<any> {
        const role = await this.rolesRepository.findById(id);
        return role;
      }
      public async findByName(name: any): Promise<any> {
        const role = await this.rolesRepository.findByName(name);
        return role;
      }
    public async updateRoles(roles: any, roleId: any): Promise<any> {

        const updateRoles = await this.rolesRepository.updateRoles(roles, roleId);
        return updateRoles;
    }

    public async deleteRoles(roleId: any): Promise<any> {
        const deleteRoles = await this.rolesRepository.deleteRoles(roleId);
        return deleteRoles;
    }
}
export default RolesService;