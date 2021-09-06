export class AppError{

    error: any;
    message : string = "Generic application error encountered.";
    name : string = "AppError";

    constructor(originalError?: any){
       this.error = originalError;
    }
}