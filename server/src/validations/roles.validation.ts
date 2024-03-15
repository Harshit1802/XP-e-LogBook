import Joi from 'joi';

class RolesValidation {
    public roles = Joi.object({
        name: Joi.string(),
        id: Joi.string(),
        createdBy: Joi.string(),
        updatedBy: Joi.string(),
        description: Joi.string(),
    });
}
export default RolesValidation;