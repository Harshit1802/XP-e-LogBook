import mongoose, { Document } from 'mongoose';

export default interface IRoles extends Document {
    createdBy: string;
    updatedBy: string;
    isDeleted: boolean;
    name: string;
    permissions: string[];
    description: string;
    isActive: boolean;
}