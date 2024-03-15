import Joi from 'joi';
import Regex from '../constants/regex.constant';

class manageUserValidation {
    public manageUser = Joi.object({
        role: Joi.string(),
        roleType: Joi.string(),
        userType: Joi.string(),
    });
}

export default manageUserValidation;