import IRoles from '../interfaces/roles.interface';
import IUser from '../interfaces/user.interface';
import Permissions from '../schemas/permissions.schema';
import Roles from '../schemas/roles.schema';

class RolesRepository {
    public async getRoles(params): Promise<IRoles[]> {
        const getRoles = await Roles.find(params).sort({ timestamp: -1 });
        return getRoles;
    }
    public async GetClinicianUserRoles(): Promise<IRoles[]> {
        const getClinicianUserRoles = await Roles.find({
            name: { $nin: ['Superadmin', 'DON', 'Owner'] }, // $nin operator matches values that are not in the specified array
        })
            .sort({ timestamp: -1 })
            .select('name id')
            .exec();
        return getClinicianUserRoles;
    }

    public async getRolesPermissionsByIds(user:IUser): Promise<any[]> {
        try {
            const rolesIds = user.roles.flat();
        
            const rolePermissions = await Roles.aggregate([
              { $match: { _id: { $in: rolesIds } } }, // Match based on the provided role IDs
              { $unwind: '$permissions' }, // Unwind permissions array to work with individual permissions
              { $group: { _id: null, permissions: { $addToSet: '$permissions' } } }, // Group and add permissions to a set to merge
              { $project: { _id: 0, permissions: 1 } } // Project to show only permissions without _id field
            ]);
        
            if (!rolePermissions || rolePermissions.length === 0) {
              console.log('No roles found for the provided IDs');
              return []; // or handle this scenario based on your application logic
            }
        
            // Extract the merged permissions from the aggregation result
            const mergedPermissions = rolePermissions[0].permissions;
            const permissions = await Permissions.find({ _id: { $in: mergedPermissions } }).exec();
            return permissions;
          } catch (error) {
            // Handle errors here
            console.error("Error fetching and merging permissions:", error);
            throw new Error("Unable to fetch and merge permissions: " + error.message);
          }
    }

    public async findById(id: any): Promise<IRoles | null> {
        const role = await Roles.findById(id);
        return role;
    }
    public async findByName(name: any): Promise<any> {
        const role = await Roles.find()
            .where({ name: name })
            .sort({ timestamp: -1 })
            .select('_id');
        return role;
    }
    public async createRoles(roles: IRoles): Promise<any> {
        const createRoles = new Roles(roles);
        const savedRoles = await createRoles.save();
        return savedRoles;
    }

    public async updateRoles(roles: any, roleId: any): Promise<any> {
        const updateRoles = await Roles.findByIdAndUpdate(
            roleId,
            { $set: roles },
            { upsert: true },
        ).select({});
        return updateRoles;
    }

    public async deleteRoles(roleId: any): Promise<IRoles | null> {
        const deleteRoles = await Roles.findByIdAndDelete(roleId);
        return deleteRoles;
    }
}
export default RolesRepository;
