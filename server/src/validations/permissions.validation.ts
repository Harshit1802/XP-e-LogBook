import Joi from 'joi';

class PermissionsValidation {
    public permissions = Joi.object({
        permissionName: Joi.string().max(30).required(),
        moduleName: Joi.string().required()
    });
}
export default PermissionsValidation;