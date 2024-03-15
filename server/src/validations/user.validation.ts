
import Joi from 'joi';
import Regex from '../constants/regex.constant';

class UserValidation {
  public register = Joi.object({
    username: Joi.string().max(30),
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    dob: Joi.date(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    phone: Joi.string(),
    address: Joi.string().max(100).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    agencyId: Joi.string(),
    roles: Joi.array(),
    pinNumber: Joi.number(),
  });
}

export default UserValidation;
