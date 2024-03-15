import { appendFile } from "fs";
import HttpCode from "../constants/http-code";
import HttpMessage from "../constants/http-message";
import logger from '../utils/logger.utils'
const errorHandler = (err, req, res, next) =>{


  console.log(err);

  let error = {...err}
  error.message = err.message;

  // Mongoose Bad ObjectId
  if (err.name === 'CastError'){
      const message = "Ressource not found";
      //error = new ErrorResponse(message, 404);
      error =  {
        code: HttpCode.NOT_FOUND,
        msg: message,
        stack: err.stack
      }
  }

  // if (err.code === 11000){
  //     const message = "Record already exists";
  //     error =  {
  //       code: HttpCode.BAD_REQUEST,
  //       msg: message,
  //       stack: err.stack
  //     }
  // }

  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue)[0];
    const message = `${duplicateField} already exists`;
    error = {
      code: HttpCode.BAD_REQUEST,
      msg: message,
      stack: err.stack,
    };
  }

  if  (err.name === 'ValidationError'){
    let message = [];
    if(err.errors){
      Object.keys(err.errors).forEach(element => {
        const validationType = err.errors[element].kind;
      if(validationType == 'regexp' || validationType == 'required'){
        message.push(err.errors[element].message);
      }
      });
    }
    
    
    error =  {
      code: HttpCode.BAD_REQUEST,
      msg: message,
      stack: err.stack
    }

  }


  logger.error(err)
  res.status(error.statusCode || 500).json({
      status:{success: false,
      error: error.msg || 'Server Error',
      stackTrace: error.stack},
      msg: error.msg
  })
}

export default errorHandler;