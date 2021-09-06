import { AppError } from "./app-error";

export class ProducstNotUpdatedError extends AppError{

    error !: any;
    name: string = "ProductsNotUpdated";
    message: string = "Warning. Products are not updated."
    constructor(){
            super();
    }
}