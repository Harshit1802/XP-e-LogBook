import Constant from '../constants/constant';

import mongoose from 'mongoose';
import IHiqDocument from '../interfaces/document.interface';

const hiqDocumentSchema = new mongoose.Schema(
    {
        moduleName: {
            type: String,
            required: false,
          },

          name: {
            type: String,
            required: false,
          },

          type: {
            type: String,
            required: false,
          },

          fileData: {
            type: String, 
          },

          size: {
            type: String,
            required: false,
          },

          base64String: {
            type: String,
            required: false,
          },

          lastModifiedDate: {
            type: Date,
          },

          timestamp: {
            type: Date,
            default: Date.now
          },
    })
    const HiqDocument = mongoose.model<IHiqDocument>(
        Constant.DOCUMENT_MODEL,
        hiqDocumentSchema,
      )
    
export default HiqDocument;