import { boolean, string } from 'joi';
import Constant from '../constants/constant';
import IUser from '../interfaces/user.interface';
import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
      min: Constant.PASSWORD_MIN_LENGTH,
    },

    firstName: {
      type: String,
      required: true
    },

    middleName: {
      type: String
    },

    lastName: {
      type: String,
      required: true
    },

    dob: {
      type: Date,
      require: true,
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true
    },


    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles',
      required:false
    }],

    address: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },


    isDeleted: {
      type: Boolean,
      default: false,
    },

    isSuperUser: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isLocked:{
         type:Boolean,
       default:false
      } ,

      pinNumber:{
        type:Number
      },
      address2:{
        type:String,
        required:false
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

const User = mongoose.model<IUser>(
  Constant.USER_MODEL,
  UserSchema,
)

export default User;
