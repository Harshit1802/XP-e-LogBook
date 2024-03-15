import Joi from 'joi';
import Regex from '../constants/regex.constant';

class DocumentValidation {
    public document = Joi.object({
        moduleName: Joi.string().max(50).required(),
        name: Joi.string().max(30).required(),
        type: Joi.string().valid('jpg', 'png', 'pdf').required(),
        fileData: Joi.binary().max(5 * 1024 * 1024).required(),
        size: Joi.number().min(1).max(5242880).required(),
        base64String: Joi.string().max(30).required(),
        lastModifiedDate: Joi.date().iso().required()
    });
}

export default DocumentValidation;