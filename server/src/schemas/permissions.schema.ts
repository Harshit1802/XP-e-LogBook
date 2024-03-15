import Constant from '../constants/constant';
import mongoose from 'mongoose';
import IPermissions from '../interfaces/permissions.interface';

const permissionsSchema = new mongoose.Schema(
    {
        
        permissionName: {
            type: String,
            required: true,
        },

        moduleName: {
            type: String,
            required: true,
        },

        timestamp: {
            type: Date,
            default: Date.now
        },
    },

    {
        versionKey: false,
        timestamps: true,
    },
)

const Permissions = mongoose.model<IPermissions>(
    Constant.PERMISSIONS_MODEL,
    permissionsSchema,
)

export default Permissions;