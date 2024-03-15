import { Document } from 'mongoose';

export default interface IUser extends Document {
  username: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  gender: string;
  email: string;
  phone: string;
  roles: string[];
  address: string;
  city: string;
  state: string;
  pinNumber: Number;
  isEnabled: Boolean;
  isDeleted: Boolean;
  isSuperUser: Boolean;
  isActive: Boolean;
  timestamp: Date;
  isLocked:boolean;
  address2:string;
}

