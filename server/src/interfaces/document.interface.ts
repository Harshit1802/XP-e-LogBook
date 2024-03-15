import { Document } from 'mongoose';

export default interface IHiqDocument extends Document {
  _id:string;
  moduleName: string;
  name: string;
  type: string;
  fileData: string;
  size: string;
  base64String: string;
  lastModifiedDate: string;
}