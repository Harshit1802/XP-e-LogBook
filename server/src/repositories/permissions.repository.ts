
import IPermissions from "../interfaces/permissions.interface";
import Permissions from "../schemas/permissions.schema";

class PermissionsRepository {

    public async getPermissions(params): Promise<IPermissions[]> {
        if(params.isDemoSchedule){
     
            params['demoSchedule'] = { $ne: null } 
            delete params.isDemoSchedule;
          }
        const getPermissions = await Permissions.find(params).sort({ "timestamp": -1 });
        return getPermissions;
    }

    public async createPermissions(permissions: IPermissions): Promise<any> {
        const createPermissions = new Permissions(permissions);
        const savedPermissions = await createPermissions.save();
        return savedPermissions;
    }

    public async updatePermissions(permissions: any, permissionId: string): Promise<any> {

        const updatePermissions = await Permissions.findByIdAndUpdate(
            permissionId,
            { $set: permissions },
            { "upsert": true }

        )
        return updatePermissions;
    }

    public async deletePermissions(permissionId: any): Promise<IPermissions | null> {
        const deletePermissions = await Permissions.findByIdAndDelete(permissionId);
        return deletePermissions;
    }
}
export default PermissionsRepository;