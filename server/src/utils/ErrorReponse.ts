class ErrorResponse extends Error{

    constructor(message, statusCode){
        super(message);
        this.name = statusCode;
    }

}

module.exports = ErrorResponse;