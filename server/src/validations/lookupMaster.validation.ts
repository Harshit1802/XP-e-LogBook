
import Joi from 'joi';
import Regex from '../constants/regex.constant';

class LookupMasterValidation {
  public lookupMaster = Joi.object({
    createdBy: Joi.string(),
    updatedBy: Joi.string(),
    lookupTableName: Joi.string(),
    id: Joi.string(),
  });
}

export default LookupMasterValidation;
