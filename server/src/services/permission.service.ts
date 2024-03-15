import PermissionsRepository from "../repositories/permissions.repository";
import IPermissions from "../interfaces/permissions.interface";


class PermissionsService {
    private permissionsRepository: PermissionsRepository;

    constructor() {
        this.permissionsRepository = new PermissionsRepository();
    }

    public async getPermissions(params?) {
        const getPermissions = await this.permissionsRepository.getPermissions(params);
        return getPermissions;
    }

    public async createPermissions(permissions: IPermissions): Promise<any> {
        const savedPermissions = await this.permissionsRepository.createPermissions(permissions);
        return savedPermissions;
    }

    public async updatePermissions(permissions: any, permissionId: any): Promise<any> {

        const updatePermissions = await this.permissionsRepository.updatePermissions(permissions, permissionId);
        return updatePermissions;
    }

    public async deletePermissions(permissionId: any): Promise<any> {
        const deletePermissions = await this.permissionsRepository.deletePermissions(permissionId);
        return deletePermissions;
    }
}
export default PermissionsService;