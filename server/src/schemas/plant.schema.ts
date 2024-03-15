import Constant from '../constants/constant';
import mongoose, { Schema } from 'mongoose';
import IRoles from '../interfaces/roles.interface';
import IPlant from '../interfaces/plant.interface';

const plantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: false,
        },

        updatedBy: {
            type: String,
            required: false,
        },

        description: {
            type: String,
            required: false,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: false,
        },

        timestamp: {
            type: Date,
            default: Date.now,
        },
    },

    {
        versionKey: false,
        timestamps: true,
    },
);

const Plant = mongoose.model<IPlant>('plant', plantSchema);

export default Plant;
