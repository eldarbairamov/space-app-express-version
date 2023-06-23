export class ApiException extends Error {
   constructor(message: string, public status: number) {
      super(message);
      this.status = status;
   }

   static DatabaseError() {
      return new ApiException("Database: Error", 500);
   }

   static BadRequest() {
      return new ApiException("Bad request", 400);
   }

   static NotExistError() {
      return new ApiException("Object does not exist", 404);
   }

   static InvalidObjectId() {
      return new ApiException("Id is not valid", 400);
   }

}