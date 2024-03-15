import { Document } from 'mongoose';

export default interface IPermissions extends Document {
    
    permissionName: string;
    moduleName: string;
}