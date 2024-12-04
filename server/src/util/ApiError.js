

class ApiError extends Error {
   constructor(
      statusCode = 500,
      message = "Internal Server Error",
      error = {},
      stack
   ) {

      super(message);
      this.statusCode = statusCode;
      this.error = error;
      this.message = message;
      this.name = "ApiError";

      if(this.stack) {
         this.stack = stack
      }
      else {
         Error.captureStackTrace(this, this.constructor);
      }
   }
   
}

export {
   ApiError
}