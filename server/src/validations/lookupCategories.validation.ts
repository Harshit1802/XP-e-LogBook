import Joi from 'joi';
import Regex from '../constants/regex.constant';

class LookupCategoriesValidation {
  public lookupCategories = Joi.object({
    createdBy: Joi.string(),
    updatedBy: Joi.string(),
    name: Joi.string(),
    id: Joi.string(),
    description: Joi.string(),
    lookupMasterId: Joi.string(),
    sequenceNo: Joi.string(),
  });
}

export default LookupCategoriesValidation;