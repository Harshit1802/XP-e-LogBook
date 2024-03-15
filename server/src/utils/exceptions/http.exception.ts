// export default class HttpException {
//     public httpCode: number;
//     public httpMessage: string;
//     public message: string;
//     constructor(
//         httpCode: number, httpMessage: string, message: string
//     ) {
//         this.httpCode = httpCode;
//         this.httpMessage = httpMessage;
//         this.message = message;
//         return {
//             httpCode: this.httpCode,
//             httpMessage: this.httpMessage,
//             message: this.message
//         }
//     }
// }
class HttpException extends Error {
    // public status: number;
    // public httpMessage: string;
    // public message: string;
    constructor(status: number,httpMessage:string , message: string) {
      super(message);
      // this.status = status;
      // this.httpMessage = message;
      this.message = message;
      this.name= status.toString()
    }
  }
  
  export default HttpException;