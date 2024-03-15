import mongoose, { Document } from 'mongoose';

export default interface IPlant extends Document {
    createdBy: string;
    updatedBy: string;
    isDeleted: boolean;
    name: string;
    location:string;
    description?: string;
    isActive: boolean;
}