import { ProductsService as productsService } from "./services/products.service";

export interface Action {
    type: string,
    payload ?: any
}

export interface IAppState{
    productList: Array<string>;
}



export let rootReducer = (state: IAppState, action: Action) => {

    switch(action.type){
        case ('LOAD_PRODUCT_LIST'): {
            productsService.

        } 
    }

    return state;
}




